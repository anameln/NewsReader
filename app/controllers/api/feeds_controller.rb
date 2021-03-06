class Api::FeedsController < ApplicationController
  def index
    # render :json => Feed.all
    @feeds = Feed.all
  end

  def show
    # render :json => Feed.find(params[:id]), include: :latest_entries
    @feed = Feed.find(params[:id])
  end

  def create
    feed = Feed.find_or_create_by_url_and_user_id(feed_params[:url], current_user.id)
    if feed
      render :json => feed
    else
      render :json => { error: "invalid url" }, status: :unprocessable_entity
    end
  end

  def destroy
    @feed = Feed.find(params[:id])
    @feed.destroy
    render json: nil
  end

  private

  def feed_params
    params.require(:feed).permit(:url)
  end
end
