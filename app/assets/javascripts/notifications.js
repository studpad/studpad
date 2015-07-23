
$(document).on("page:load ready", function(){
  $('.notice_delete').click(function(){
    $(this).parent().parent().parent().parent().remove()
  })
});
