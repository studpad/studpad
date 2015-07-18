
$(document).on("page:load ready", function(){
  console.log("Глобальная перезагрузка")
  //$("textarea[name=description]").autoResize()
  function clear_modal_window(){
    $("#main-photo-dropzone").show().prev().remove();
    $("#loaded-photos").empty();
    $("#loaded-documents").empty();
    $("input[name=main_image]").val(null);
    $("input[name=tag]").val(null);
    $("input[name=attached_files]").val(null);
    $("textarea[name=description]").val(null).removeAttr("style");
    $(".choice-theme-material").select2('val', null);
  }

  function delete_files (){
    $("a.X18").click();
  }

  function edit_material(){
    console.log('Редактирование начато');
    modal_window = $('#modal_window');
    $('#myModalLabel').html("Редактирование");
    $('#send-material').html("Сохранить");

    if (modal_window.attr('data') == 'create'){
      delete_files();
      modal_window.attr('data', 'edit');
    }

    clear_modal_window();

    url = $(this).attr("data");

    $.getJSON(url, function(data){
      $("#remove_material").attr('href', data.form_link).show()
      .click(function(){
        $("#" + data.html_id).remove();
      });
      $("#material-form").attr('action', data.form_link).attr('old_id', data.html_id)
      .find('input[name=_method]').val('patch');
      $("textarea[name=description]").val(data.description);
      $("input[name=main_image]").val(data.main_image_id);
      $("input[name=attached_files]").val(data.attachment_ids);
      if (data.main_photo){
        $("#main-photo-dropzone").hide().parent().prepend(data.main_photo)
        .find('a').click(function() {
          $(this).parent().parent().remove();
          $("#main-photo-dropzone").show();
          $("input[name=main_image]").val(null);
        });
      }

      $(".choice-theme-material").select2('val', data.tag);
      photos_container = $("#loaded-photos");
      for(var i in data.images){
        photos_container.append(data.images[i]);
      }
      photos_container.find('a').click(function() {
        id = $(this).attr('attachment');
        $(this).parent().parent().remove();
        input = $("input[name=attached_files]");
        input.val(input.val().replace(id, ""));
      });
      documents_container = $("#loaded-documents");
      for(var f in data.files){
        documents_container.append(data.files[f]);
      }
      documents_container.find('a').click(function() {
        id = $(this).attr('attachment');
        $(this).parent().parent().remove();
        input = $("input[name=attached_files]");
        input.val(input.val().replace(id, ""));
      });
      $("textarea[name=description]").keydown();
    })
  }

  $('#create_material').click(function(){
    if ($('#modal_window').attr('data') == 'edit'){
      clear_modal_window();
      $(this).attr('data', 'create');
      $('#myModalLabel').html("Создайте полезный материал");
      $('#send-material').html("Создать");
    }

    $("#remove_material").hide();
    $('#modal_window').attr('data', 'create');
    material_form = $("#material-form");
    original_action =  material_form.attr('original_action');
    material_form.attr('action', original_action)
      .find('input[name=_method]').val('post');
  });

  $(".update-UM").click(edit_material);

  //Прикрипление файлов#####################################
  $("#material-dropzone").dropzone({
    clickable: '#material-dropzone .drop-zone',
    previewsContainer: false,
    processing: function(file) {
      $('#send-material').button('loading');
    },
    success: function(file, response) {
      //Добавление превью файла
      $('#send-material').button('reset');
      if (response.type == "image") {
        html = "<div class = 'col-xs-6 set-of-photos4 show-X' style = 'background: url("
        html += response.link
        html += "); background-size: cover;'>\
                <div class = 'del-this-file'>"
        html += response.remove_link + "</div></div>"
        $("#loaded-photos").append(html).find('a').click(function() {
          $(this).parent().parent().remove()
          input = $("input[name=attached_files]")
          input.val(input.val().replace(response.id, ""))
        })
      } else {
        html = "<div class = 'this-material this-material-preview show-X'>\
                          <div class = 'del-this-file'>"
        html += response.remove_link
        html += "</div><div class = 'files-image type-document'></div><div class = 'name-files'>"
        html += "<a>" + response.name + "</a>"
        html += "</div></div>"
        $("#loaded-documents").append(html).find('a').click(function() {
          $(this).parent().parent().remove()
          input = $("input[name=attached_files]")
          input.val(input.val().replace(response.id, ""))
        })
      }
      input = $("input[name=attached_files]")
      files = input.val(input.val() + ' ' + response.id)
    }
  });


  //Прикрипление главной фотографии#####################################
  $("#main-photo-dropzone").dropzone({
    clickable: '#main-photo-dropzone .drop-zone',
    previewsContainer: false,
    acceptedFiles: ".jpg,.gif,.png",
    processing: function(file) {
      $('#send-material').button('loading');
    },
    success: function(file, response) {

      $('#send-material').button('reset');
      html = "<div class = 'useful-material_img show-X'>"
      html += "<div class = 'del-this-file'>" + response.remove_link + "</div>"
      html += "<img src = '" + response.link + "' width = '100%'/></div>"

      $("#main-photo-dropzone").parent().prepend(html).find('a').click(function() {
        $(this).parent().parent().remove()
        $("#main-photo-dropzone").show();
        $("input[name=main_image]").val(null)
      });

      $("#main-photo-dropzone").hide();
      $("input[name=main_image]").val(response.id)
    }
  })

  $("#send-material").click(function(){
    if ($.trim($("textarea[name=description").val()) == "")
      return;
    tag = $("select[name=tag]").val()
    if (tag != null){
      $("input[name=tag]").val(tag[0])
    }

    $("#material-form").ajaxSubmit({
      success: function(data, status, response) {
        if ($('#modal_window').attr('data') == 'edit'){
          html_id = "#" + $('#material-form').attr('old_id')
          $(html_id).replaceWith(response.responseText)
          $(html_id).find(".update-UM").click(edit_material)
          .end().find(".view-the-material").click(view_material)
          .end().find(".jp-jplayer").each(init_player)
        } else {

          $("#all_materials").prepend(response.responseText)
          .children().first().find(".update-UM").click(edit_material)
          .end().find(".view-the-material").click(view_material)
          .end().find(".jp-jplayer").each(init_player)
        }
      },
      error: function(data) {
        console.log("error")
      }
    });
    clear_modal_window()
  })

  function view_material(){
    $.ajax({
      type: "GET",
      url: $(this).attr('link'),
      success: function(data){
        $('#modal-view-the-material').html(data)
      }
    })
  }
  $(".view-the-material").click(view_material);

})
