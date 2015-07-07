
$(document).on("page:load ready", function(){
  $(".show-X").mouseover(function(){
    $(this).children('.del-this-file').children().css("display", "inline");
  });
  $(".show-X").mouseout(function(){
    $(this).children('.del-this-file').children().css("display", "none");
  });
  var dz = new Dropzone("#material-dropzone", {
    dictDefaultMessage: 'Нажмите сюда или просто перетащите файлы для загрузки',
    clickable: '.drop-zone'
  })

  dz.on("success", function(file, response) {
    dz.removeFile(file);
    //Добавление превью файла
    switch (response.type) {
    case "image":
      console.log(response)
      html = "<div class = 'col-xs-6 set-of-photos4 show-X' style = 'background: url("
      html += response.link
      html += "); background-size: cover;'>\
              <div class = 'del-this-file'>"
      html += response.remove_link + "</div></div>"
      console.log(html)
      $("#loaded-photos").append(html).click(function() {
        $('#' + response.id ).hide()
      });
      $("#loaded-photos .show-X:last-child").mouseover(function(){
        $(this).children('.del-this-file').children().css("display", "inline");
      }).mouseout(function(){
        $(this).children('.del-this-file').children().css("display", "none");
      }).find('a').click(function() {
        $(this).parent().parent().remove()
      })
      break;
    case "video":
      alert("видос")
    }

  });
  $(".description-add-material").focus(function(){
     $(this).addClass('height350');
  });
})
