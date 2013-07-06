class Devise::UsersController < ApplicationController
  def show
    if current_user
      render json: current_user.user_json
    else
      render status: :unauthorized
    end
  end

  def add_favorite
    df = DeckFavorite.new(user_id: current_user.id, deck_id: params[:deck_id])
    df.save

    render json: current_user.user_json
  end

  def remove_favorite
    df = DeckFavorite.where(user_id: current_user.id, deck_id: params[:deck_id]).first
    df.destroy

    render json: current_user.user_json
  end
end
