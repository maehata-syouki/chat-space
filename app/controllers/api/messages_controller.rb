class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(group_id: params[:group_id])
  end
end