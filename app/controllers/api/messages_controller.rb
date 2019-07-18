class Api::MessagesController < ApplicationController
  def index
    @message = Message.where(group_id: )
    @messages = group.messages.includes(:user).where('id > ?', params[:last_id])
  end
end
