$(document).on("page:load ready", function(){

  $('.share-post').click(function(){
    $("#share-form").find('input[name=material_id]')
    .val($(this).attr('material_id'))
  })

  $('.share-obj').click(function(){

    data_id = $(this).attr('data_id')
    type = $(this).attr('type')
    form = $("#share-form")
    form.find('input[name=id]')
    .val(data_id).end()
    .find('input[name=type]').val(type)
    form.ajaxSubmit({
      success: function(data, status, response) {
        console.log(data)
        material_id = $("#share-form").find('input[name=material_id]').val()
        $("#material" + material_id).find("span b").html(data)
      }
    })

  })
})
