$(document).on("page:load ready", function(){
  function clear_modal_window(){
    $("#loaded-documents").empty();
    $("input[name=main_image]").val(null)
    $("input[name=tag]").val(null)
    $("input[name=attached_files]").val(null)
    $("textarea[name=description]").val(null).removeAttr("style")
    $(".choice-theme-material").select2('val', null);
  }

  function delete_files (){
    $("a.X18").click()
  }

  function edit_homework(){
    modal_window = $('#modal_window')
    $('#myModalLabel').html("Редактирование")
    $('#send-homework').html("Сохранить")

    if (modal_window.attr('data') == 'create'){
      delete_files()
      modal_window.attr('data', 'edit')
    }

    clear_modal_window()

    url = $(this).attr("data")

    $.getJSON(url, function(data){
      console.log("Начата обработка редактирования")
      $("#remove_homework").attr('href', data.form_link).show()
      .click(function(){
        $("#" + data.html_id).remove()
      })
      $("#homework-form").attr({ action: data.form_link, old_id: data.html_id})
      .find('input[name=_method]').val('patch')
      $("textarea[name=description]").val(data.description)
      $("input[name=attached_files]").val(data.attachment_ids)
      if (data.main_photo){
        $("#main-photo-dropzone").hide().parent().prepend(data.main_photo)
        .find('a').click(function() {
          $(this).parent().parent().remove()
          $("#main-photo-dropzone").show();
          $("input[name=main_image]").val(null)
        });
      }

      $(".choice-theme-material").select2('val', data.tag);
      documents_container = $("#loaded-documents")
      for(var f in data.files){
        console.log("Добавление файла")
        documents_container.append(data.files[f])
      }
      documents_container.find('a').click(function() {
        id = $(this).attr('attachment')
        $(this).parent().parent().remove()
        input = $("input[name=attached_files]")
        input.val(input.val().replace(id, ""))
      })

    }).fail(function(jqXHR, textStatus, errorThrown)
    { console.log('Ошибка при загрузке редактируемого материала ' + textStatus); })
  }

  $("#send-homework").click(function(){
    if ($.trim($("textarea[name=description").val()) == "")
      return;
    tag = $("select[name=tag]").val()
    if (tag != null){
      $("input[name=tag]").val(tag[0])
    }
    $("#homework-form").ajaxSubmit({
      success: function(data, status, response) {
        if ($('#modal_window').attr('data') == 'edit'){
          console.log('after edit')
          html_id = "#" + $('#homework-form').attr('old_id')
          $(html_id).replaceWith(response.responseText)
          $(html_id).find(".update-HM").click(edit_homework)
        } else {
          console.log('after create')
          $("#all_homeworks").prepend(response.responseText).next()
          .find(".update-HM").click(edit_homework)
        }
      },
      error: function(data) {
        console.log("error")
      }
    });
    clear_modal_window()
  })

  $(".update-HM").click(edit_homework)

  $("#homework-file-dropzone").dropzone({
    clickable: '.drop-zone',
    previewsContainer: false,
    success: function(file, response) {
      html = "<div class = 'this-material this-material-preview show-X'>\
                        <div class = 'del-this-file'>"
      html += response.remove_link
      html += "</div><div class = 'files-image type-document'></div><div class = 'name-files'>"
      html += "<a>" + response.name + "</a>"
      html += "</div></div>"
      $("#loaded-documents").append(html)
      .find('.X18').click(function() {
        $(this).parent().parent().remove()
        input = $("input[name=attached_files]")
        input.val(input.val().replace(response.id, ""))
      })

      input = $("input[name=attached_files]")
      files = input.val(input.val() + ' ' + response.id)
    },
    error: function(a, b){
      console.log("Произошла ошибка")
      console.log(a)
      console.log(b)
    }

  });

  $('#create-homework').click(function(){
    modal_window = $('#modal_window')
    if (modal_window.attr('data') == 'edit'){
      clear_modal_window()
      $(this).attr('data', 'create')
      modal_window.find('#myModalLabel').html("Новое домашнее задание")
      modal_window.find('#send-homework').html("Сообщить")
    }

    modal_window.find("#remove_homework").hide()
    modal_window.attr('data', 'create')
    form = modal_window.find("#homework-form")
    form = form.attr('action', form.attr('original_action'))
      .find('input[name=_method]').val('post')
  })

})
