json.content @message.content
json.image @message.image
json.date  @message.created_at.to_s(:default)
json.user_name @message.user.name
json.id @message.id