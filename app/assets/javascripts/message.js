$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                        ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                        ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${img}
                  </div>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat_box__messages').append(html);
      $('#new_message')[0].reset();
      $('.chat_box__messages').animate({scrollTop: $('.chat_box__messages')[0].scrollHeight}, 'fast');
      console.log(html)
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージ送信できませんでした。');
    })
    .always(function(data){
      $('.chat_box__form__new_message__submit').prop('disabled', false);
    })
  })
});
