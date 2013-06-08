class ScrollsController < ApplicationController
  def index
    respond_to do |format|
      format.html {}
      format.json { render json: Scroll.all }
    end
  end
end
