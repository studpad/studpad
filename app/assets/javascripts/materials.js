
$(document).on("page:load ready", function(){
  $('#material-dropzone').dropzone({
    addRemoveLinks: true,
    dictRemoveFile: 'Удалить',
    //autoProcessQueue:
    //clickable: true,
    dictDefaultMessage: 'Нажмите сюда или просто перетащите файлы для загрузки'
  }).on('removedfile', function(){
    alert('hello world')
  })
})

$(".show-X").mouseover(function(){
  $(this).children('.del-this-file').children().css("display", "inline");
});
$(".show-X").mouseout(function(){
  $(this).children('.del-this-file').children().css("display", "none");
});
