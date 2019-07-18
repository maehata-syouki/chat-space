# json.id   @message.id
# json.content  @message.content
# json.date   @message.created_at.strftime("%Y/%m/%d  %H:%M")
# json.user_name  @message.user.name
# json.image  @message.image.url

json.content @message.content
json.image @message.image
json.date  @message.created_at.to_s(:default)
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id