$(document).on("page:load ready", function(){
  $("#send-news").click(function(){
    form = $('#new_news_item')

    form.ajaxSubmit({

      success: function (data, status, response) {
        $('#each-news').prepend(data)
        console.log("hello")
      }
    })
  });

  $("#textHW").focus(function(){

      $(this).css('color', 'black');
      $('.wrap-send-news').css('display', 'block');

    });



    $("#textHW").blur(function(){

      val = $(this).val();
      val = $.trim(val);

      if(!val){
        //$('.wrap-send-news').css('display', 'none');
        $(this).css('height', '30px');
      }
    });

    /*$(".description-add-material").focus(function(){
      $(this).addClass('all0');
    });*/

    

    $(".textHW_comment").focus(function(){

      $(this).css('color', '#383838');
      $(this).next().children('.post-comment-of-news').css('display', 'block');


    });

    $(".textHW_comment").blur(function(){

      val = $(this).val();
      val = $.trim(val);

      if(!val){
        $(this).next().children('.post-comment-of-news').css('display', 'none');
        $(this).css('height', '30px');
      }
    });



    $(".give-comment").click(function(){

      $(this).parent().next().css('display', 'block');
      $(this).parent().next().children('form').children('.textHW_comment').focus();
    });


    $(".pencil-news").click(function(){

      val = $(this).parent().next().next().children().html();
      height = $(this).parent().next().next().height();
      $(this).parent().next().next().children('span').css('display', 'none');
      $(this).parent().next().next().next().children().children('textarea').height(height).val(val);
      $(this).parent().next().next().next().css('display', 'block');
      $(this).parent().next().next().next().children().children('textarea').focus();

    });



    $(".pencil-comment").click(function(){

      val = $(this).parent().next().next().children().html();
      height = $(this).parent().next().next().height();
      $(this).parent().next().next().css('display', 'none');
      $(this).parent().next().next().next().children().children('textarea').height(height).val(val);
      $(this).parent().next().next().next().css('display', 'block');
      $(this).parent().next().next().next().children().children('textarea').focus();

    });
});
