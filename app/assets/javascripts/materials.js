
$(document).on("page:load ready", function(){
  $(".show-X").mouseover(function(){
    $(this).children('.del-this-file').children().css("display", "inline");
  });
  $(".show-X").mouseout(function(){
    $(this).children('.del-this-file').children().css("display", "none");
  });
  var dz = new Dropzone("#material-dropzone", {
    clickable: '#material-dropzone .drop-zone',
    previewsContainer: false
  })

  dz.on("success", function(file, response) {
    //Добавление превью файла
    if (response.type == "image") {
      html = "<div class = 'col-xs-6 set-of-photos4 show-X' style = 'background: url("
      html += response.link
      html += "); background-size: cover;'>\
              <div class = 'del-this-file'>"
      html += response.remove_link + "</div></div>"
      $("#loaded-photos").append(html)
      $("#loaded-photos .show-X:last-child").mouseover(function(){
        $(this).children('.del-this-file').children().css("display", "inline");
      }).mouseout(function(){
        $(this).children('.del-this-file').children().css("display", "none");
      }).find('a').click(function() {
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
      $("#loaded-documents").append(html)
      $("#loaded-documents .show-X:last-child").mouseover(function(){
        $(this).children('.del-this-file').children().css("display", "inline");
      }).mouseout(function(){
        $(this).children('.del-this-file').children().css("display", "none");
      }).find('a.X18').click(function() {
        $(this).parent().parent().remove()
        input = $("input[name=attached_files]")
        input.val(input.val().replace(response.id, ""))
      })
    }
    input = $("input[name=attached_files]")
    files = input.val(input.val() + ' ' + response.id)

  });

  var main_photo_dz = new Dropzone("#main-photo-dropzone", {
    clickable: '#main-photo-dropzone .drop-zone',
    previewsContainer: false
  })
  main_photo_dz.on("success", function(file, response) {
    //dz.removeFile(file);

    html = "<div class = 'useful-material_img show-X'>"
    html += "<div class = 'del-this-file'><span class = 'X18'>&times;</span></div>"
    html += "<img src = '" + response.link + "' width = '100%'/></div>"
    $("#main-photo-dropzone").parent().prepend(html);
    $("#main-photo-dropzone").hide();
    $("input[name=main_image]").val(response.id)
  })

  $("#send").click(function(){
    $("#material-form").ajaxSubmit({
      success: function(data, status, response) {
        console.log(response)
      },
      error: function(data) {
        console.log("error")
      }
    });
    $("#main-photo-dropzone").prev().hide();
    $("#main-photo-dropzone").show();
    $("#loaded-photos").empty();
    $("#loaded-documents").empty();
    $("input[name=main_image]").val(null)
    $("input[name=attached_files]").val(null)
    $("textarea[name=description").val(null).removeAttr("style")
  })
  $(".description-add-material").focus(function(){
     $(this).addClass('height350');
  });
})
