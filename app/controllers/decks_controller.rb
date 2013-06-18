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

  def create
    @deck        = Deck.new(params[:deck])
    deck_scrolls = params[:scrolls].map{ |scroll|
      DeckScroll.new(scroll_id: scroll[:id], count: scroll[:count])
    }

    @deck.deck_scrolls = deck_scrolls

    respond_to do |format|
      format.json { render json: :ok }
    end
  end

end
