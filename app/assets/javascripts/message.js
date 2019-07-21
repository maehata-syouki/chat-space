$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var image = (message.image.url)? `<image class="lower-message__image" src="${message.image.url}">`:"";
    var html = `<div class="message-group" data-message-id=${message.id}>
                  <div class="message-list-create">
                    <div class="message-list__name">
                      ${message.user_name}
                    </div>
                    <div class="message-list__post-date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message-list__content">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                  ${image}
                </div>`
    return html;
  }

  // 非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url:          url,
      type:         "POST",
      data:         formData,
      dataType:     'json',
      processData:  false,
      contentType:  false
    })

    .done(function(data){
      var html = buildHTML(data);
      $(".messages-screen").append(html);
      $(".form-group").val('');
      $('#new_message')[0].reset();
      $(".send-btn").prop('disabled', false);
      $('.messages-screen').animate({scrollTop: $('.messages-screen')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
      $(".send-btn").prop('disabled', false);
    })
  });

  // 自動更新の実装
  var reloadMessages = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $('.messages-screen').animate({scrollTop: $('.messages-screen')[0].scrollHeight}, 'fast');
      var last_message_id = $('.message-group:last').data('message-id')
      var group_id = $('.group-name').data('id');
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
          $('.messages-screen').append(insertHTML)
          $('.messages-screen').animate({scrollTop: $('.messages-screen')[0].scrollHeight}, 'fast');
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