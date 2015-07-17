var avatar_crop;
$(document).on("page:load ready", function(){
  function update_crop(coords) {
    $('#crop_x').val(coords.x);
    $('#crop_y').val(coords.y);
    $('#crop_w').val(coords.w);
    $('#crop_h').val(coords.h);
    var img = $('#avatar-crop')
    $('#height').val(img.height());
    $('#width').val(img.width());
  }
  $('#send-avatar').click(function(){
      $("#crop-form").submit();
    });
  $("#avatar-dropzone").dropzone({
    clickable: '#avatar-dropzone .drop-zone',
    previewsContainer: false,
    paramName: 'avatar',
    acceptedFiles: ".jpg,.gif,.png",
    success: function(file, response) {
      avatar_crop = $('#avatar-crop').data('Jcrop');
      if (avatar_crop){
        avatar_crop.destroy();
      }

      var image_html = "<image id='avatar-crop' src='" + response.url +
      "' style='width:100%'>"
      $('#mywrapper').html(image_html)
      var img = $('#avatar-crop')

      img.Jcrop( {
        onChange: update_crop,
        onSelect: update_crop,
        setSelect: [0, 0, 50, 50],
        aspectRatio: 1
      });
    }

      //Добавление превью файла
    //   if (response.type == "image") {
    //     html = "<div class = 'col-xs-6 set-of-photos4 show-X' style = 'background: url("
    //     html += response.link
    //     html += "); background-size: cover;'>\
    //             <div class = 'del-this-file'>"
    //     html += response.remove_link + "</div></div>"
    //     $("#loaded-photos").append(html).find('a').click(function() {
    //       $(this).parent().parent().remove()
    //       input = $("input[name=attached_files]")
    //       input.val(input.val().replace(response.id, ""))
    //     })
    //   } else {
    //     html = "<div class = 'this-material this-material-preview show-X'>\
    //                       <div class = 'del-this-file'>"
    //     html += response.remove_link
    //     html += "</div><div class = 'files-image type-document'></div><div class = 'name-files'>"
    //     html += "<a>" + response.name + "</a>"
    //     html += "</div></div>"
    //     $("#loaded-documents").append(html).find('a').click(function() {
    //       $(this).parent().parent().remove()
    //       input = $("input[name=attached_files]")
    //       input.val(input.val().replace(response.id, ""))
    //     })
    //   }
    //   input = $("input[name=attached_files]")
    //   files = input.val(input.val() + ' ' + response.id)
    // }
  });

});
