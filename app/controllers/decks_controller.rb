class DecksController < ApplicationController
  before_filter :authenticate_user!, only: [:update, :create, :destroy]
  before_filter :load_deck, only: [:show, :update, :destroy]
  before_filter :ensure_ownership, only: [:update, :destroy]

  def index
    respond_to do |format|
      format.json {
        if user_signed_in?
          render json: current_user.decks, each_serializer: DeckSerializer
        else
          render json: []
        end
      }
    end
  end

  def all
    respond_to do |format|
      format.json { render json: Deck.all, each_serializer: DeckSerializer }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @deck, serializer: DeckSerializer }
    end
  end

  def update
    @deck.update_attributes(params.slice(:name))

    deck_scrolls = []
    params[:scrolls].each do |scroll|
      deck_scroll = DeckScroll.find_or_initialize_by_scroll_id_and_deck_id(scroll_id: scroll[:id],
                                                                           deck_id: @deck.id)
      deck_scroll.count = scroll[:count]

      deck_scrolls << deck_scroll
    end if params[:scrolls] && params[:scrolls] != nil

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

  def add_view
    deck = Deck.find(params[:id])
    deck.update_attribute('views', deck.views + 1)
    deck.save
  end

  private

  def load_deck
    @deck = Deck.find(params[:id])
  end

  def ensure_ownership
    if current_user != @deck.user
      render status: :forbidden
    end
  end

end
