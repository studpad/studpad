
$(document).on("page:load ready", function(){
  $('#change-password').click(function(){
    $("#change-password-form").ajaxSubmit({
      success: function(data, status, response) {
        $('.notice-content').removeClass('error').html(response.responseText);
        $('.notice').fadeIn()
      },
      error: function(data) {
        $('.notice-content').addClass('error').html(data.responseText);
        $('.notice').fadeIn()
      }
    });
  })
})
