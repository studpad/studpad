
$(document).on("page:load ready", function(){
  $(".type-of-community").click(function(){
    $("#community_status").val($(this).attr('data'));
  });
});
