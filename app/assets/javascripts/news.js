$(document).on("page:load ready", function(){
  $("#send-news").click(function(){
    form = $('#new_news_item')

    form.ajaxSubmit({

      success: function (data, status, response) {
        $('#each-news').prepend(data)
        console.log("hello")
      }
    })
  })
})
