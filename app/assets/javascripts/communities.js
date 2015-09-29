
$(document).on("page:load ready", function(){
  $(".type-of-community").click(function(){
    $("#community_status").val($(this).attr('data'));
  });

  //авторасширение
  val_community_description = $('#community_description').html();
  $('.autoequel-height').html(val_community_description);
  $("#community_description").height($('.autoequel-height').height() + 25);
  $('textarea#community_description').autoResize({
    limit:600,
    extraSpace:30, 
    animate:true
  });


});
