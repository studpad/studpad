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
  });

});
