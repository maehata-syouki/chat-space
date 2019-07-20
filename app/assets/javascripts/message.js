$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var image = (message.image.url)? `<image class="lower-message__image" src="${message.image.url}">`:"";
    var html = `<div class="message" data-message-id="${message.id}>
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
                    ${image}
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
      $('.chat_box__messages__message').append(html);
      $('#new_message')[0].reset();
      $('.chat_box__messages__message').animate({scrollTop: $('.chat_box__messages__message')[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージ送信できませんでした。');
    })
    .always(function(data){
      $('.chat_box__form__new_message__submit').prop('disabled', false);
    })
  })


  var reloadMessages = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $('.chat_box__messages').animate({scrollTop: $('.chat_box__messages')[0].scrollHeight}, 'fast');
      var last_message_id = $('.message:last').data('message-id')
      var group_id = $('.chat_box__header__groupname__left_box').data('id');
      var href = "/groups/" + group_id + "/api/messages";
      $.ajax({
        url: href,
        type: "GET",
        data: {last_id: last_message_id},
        dataType: "json",
      })
      .done(function(data) {
        var insertHTML = "" ;
        data.forEach(function(message) {
          var insertHTML = buildHTML(message)
          $('.chat_box__messages').append(insertHTML)
          $('.chat_box__messages').animate({scrollTop: $('.chat_box__messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(reloadMessages);
      }
  } , 5000 );
});
// });
