class FriendsController < ApplicationController
before_action :authenticate_user!
	
	def index
		@friends = Friend.order(created_at: :desc)
		respond_to do |format|
      format.html {render :index}
      format.json {render json: @friends}
		end
	end

	def show
		@friend = Friend.find(params[:id])
		 respond_to do |format|
      format.html {render :show}
      format.json {render json: @friend}
    end
	end


	def create
		@friend = Friend.create(friend_params)
		respond_to do |format|
      if @friend.save
        format.html { redirect_to friend_path(@friend) }
        format.json { render json: @friend, status: 200 }
      else
        format.html { render :new }
        format.json { render json: @friend.errors, status: 422 }
      end
    end
	end

	def update

		@friend = Friend.find(params[:id])
		 respond_to do |format|
      if @friend.update(friend_params)
        format.html { redirect_to friend_path(@friend) }
        format.json { render json: @friend }
      else
        format.html { render :edit }
        format.json { render json: @friend.errors, status: 422 }
      end
    end
	end

	def destroy
		@friend = Friend.find(params[:id])
		@friend.destroy
		respond_to do |format|
      format.html { redirect_to friends_path }
      format.json { head :no_content }
    end
	end

	private

	def friend_params
		params.require(:friend).permit(:firstName, :lastName, :email)
	end

end