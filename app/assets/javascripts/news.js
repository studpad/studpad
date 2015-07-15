
var new_images = {}//Хэш для хранения кэшированных версий фото

$(document).on("page:load ready", function(){
  function clear_form(){
    console.log("Очистка формы")
    form_div = $('#form-send-news')
    form_div.find("textarea").val(null)
    form_div.find(".preview-images-news").empty()
    form_div.find(".preview-files-news").empty()
  }

  $("#send-news").click(function(){
    form = $('#new_news_item')
    //на случай пустой формы
    if ($.trim(form.find("textarea").val()) == "")
      return;

    console.log("начата отправка новости")
    form.ajaxSubmit({
      success: function (data, status, response) {
        $('#each-news').prepend(data)
        clear_form()
        console.log("Новость успешно создана")
      }
    })

  })

  $("#news-dropzone").dropzone({
    clickable: '#attach-file-news',
    previewsContainer: false,
    thumbnail: function(file, dataUrl){
      new_images[file.name] = dataUrl
    },
    success: function(file, response) {

      if (response.type == "image") {
        html = "<div class = 'col-xs-2 this-preview-images-news show-X' style = 'background: url("
        html += new_images[file.name]
        html += "); background-size: cover;'>\
                <div class = 'del-this-file'>"
        html += response.remove_link + "</div></div>"
        $(".preview-images-news").append(html)
        .find('a').click(function() {
          $(this).parent().parent().remove()
          input = $("input[name=attached_files]")
          input.val(input.val().replace(response.id, ""))
        })
      } else {
        html = "<div class = 'files-this-post-news col-xs-3 show-X'>\
                          <div class = 'del-this-file'>"
        html += response.remove_link
        html += "</div><div class = 'files-image-mini type-document'>\
        </div><div class = 'name-files-mini'>"
        html += "<a>" + truncate(response.name, 15)+ "</a>"
        html += "</div></div>"
        $(".preview-files-news").append(html).find('a').click(function() {
          $(this).parent().parent().remove()
          input = $("input[name=attached_files]")
          input.val(input.val().replace(response.id, ""))
        })
      }
      input = $("input[name=attached_files]")
      files = input.val(input.val() + ' ' + response.id)
    }
  });
/*OLD#################################################################*/
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
    $(this).parent().next().next().next()
    .children().children('textarea').height(height).val(val);
    $(this).parent().next().next().next().css('display', 'block');
    $(this).parent().next().next().next().children().children('textarea').focus();
  });

  $(".pencil-comment").click(function(){

    val = $(this).parent().next().next().children().html();
    height = $(this).parent().next().next().height();
    $(this).parent().next().next().css('display', 'none');
    $(this).parent().next().next().next()
    .children().children('textarea').height(height).val(val);
    $(this).parent().next().next().next().css('display', 'block');
    $(this).parent().next().next().next().children().children('textarea').focus();

  });

})













