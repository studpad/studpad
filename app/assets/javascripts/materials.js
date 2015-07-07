
$(document).on("page:load ready", function(){
  var dz = new Dropzone("#material-dropzone", {
    dictDefaultMessage: 'Нажмите сюда или просто перетащите файлы для загрузки',
    clickable: '.drop-zone'
  })
  dz.on("success", function(file, response) {
    dz.removeFile(file);
    //Добавление превью файла
    console.log(response)
    html = "<div class = 'col-xs-6 set-of-photos4 show-X' style = 'background: url("
    html += response.link
    html += "); background-size: cover;'>\
            <div class = 'del-this-file'>\
            <span class = 'X18'>&times;</span>\
            </div></div>"
    $("#loaded-photos").append(html).click(function() {
      $('#' + response.id ).hide()
    });
  });
})

$(".show-X").mouseover(function(){
  $(this).children('.del-this-file').children().css("display", "inline");
});
$(".show-X").mouseout(function(){
  $(this).children('.del-this-file').children().css("display", "none");
});
