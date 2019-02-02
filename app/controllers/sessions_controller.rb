class SessionsController < ApplicationController

  def new
    @user = User.new
    @users = User.all
  end

  def create
    @user = User.find_by(name: params[:user][:name])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      @user.save
      redirect_to user_path(@user)
    else
      redirect_to signin_path
    end
  end

  def destroy
    reset_session
    redirect_to root_path
  end

end
