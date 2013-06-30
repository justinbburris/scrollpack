class DecksController < ApplicationController
  before_filter :authenticate_user!, only: [:update, :create, :destroy]
  before_filter :load_deck, except: [:index, :create]
  before_filter :ensure_users_deck, only: [:update, :destroy]

  def index
    respond_to do |format|
      format.json { render json: current_user.decks }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @deck }
    end
  end

  def update
    @deck.name = params[:name]

    deck_scrolls = []
    params[:scrolls].each do |scroll|
      deck_scroll = DeckScroll.find_or_initialize_by_scroll_id_and_deck_id(scroll_id: scroll[:id],
                                                                           deck_id: deck.id)
      deck_scroll.count = scroll[:count]

      deck_scrolls << deck_scroll
    end if params[:scrolls]

    @deck.deck_scrolls = deck_scrolls

    if @deck.save
      respond_to do |format|
        format.json { render json: @deck }
      end
    end
  end

  def create
    deck         = Deck.new(params[:deck])
    deck.user    = current_user
    deck_scrolls = params[:scrolls].map{ |scroll|
      DeckScroll.new(scroll_id: scroll[:id], count: scroll[:count])
    }

    deck.deck_scrolls = deck_scrolls

    deck.save

    respond_to do |format|
      format.json { render json: deck }
    end
  end

  def destroy
    if @deck.destroy
      render json: :ok
    end
  end

  private

  def load_deck
    @deck = Deck.find(params[:id])
  end

  def ensure_ownership
    if current_user != @deck.user?
      render status: :unauthorized
    end
  end
end
