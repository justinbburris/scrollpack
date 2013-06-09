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

end
