
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

  $(".description-add-material").focus(function(){
     $(this).addClass('height350');
  });

});
