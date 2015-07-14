$(document).on("page:load ready", function(){

  $('.share-post').click(function(){
    $("#share-form").find('input[name=material_id]')
    .val($(this).attr('material_id'))
  })

  $('.share-obj').click(function(){

    classroom_id = $(this).attr('classroom_id')
    form = $("#share-form")
    form.find('input[name=classroom_id]')
    .val(classroom_id)
    form.ajaxSubmit({
      success: function(data, status, response) {
        console.log(data)
        material_id = $("#share-form").find('input[name=material_id]').val()
        $("#material" + material_id).find("span b").html(data)
      }
    })

  })
})
