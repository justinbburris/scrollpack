class DecksController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Deck.all }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: Deck.find(params[:id]) }
    end
  end

  def update
    deck = Deck.find(params[:id])
    deck_scrolls = []
    params[:scrolls].each do |scroll|
      deck_scroll = DeckScroll.find_or_initialize_by_scroll_id_and_deck_id(scroll_id: scroll[:id],
                                                                           deck_id: deck.id)
      deck_scroll.count = scroll[:count]

      deck_scrolls << deck_scroll
    end if params[:scrolls]

    deck.deck_scrolls = deck_scrolls

    if deck.save
      respond_to do |format|
        format.json { render json: deck }
      end
    end
  end

  def create
    deck        = Deck.new(params[:deck])
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
    deck = Deck.find(params[:id])

    if deck.destroy
      render json: :ok
    end
  end
end
