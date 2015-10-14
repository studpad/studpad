function main(){
    //users form begin
    $('#teacher_category').hide();
    $('#teacher_specialization').hide();
    $('#user_type_teacher').click(function(){
      $('#teacher_category').show();
    });
    $('#user_type_student').click(function(){
      $('#teacher_category').hide();
      $('#teacher_specialization').hide();
    });
    $('#teacher_category').change(function(e){
      if (e.target.value == 3)
        $('#teacher_specialization').show();
    });


    if ($('#teacher-category-edit').val() != 3)
      $('#teacher-specialization-edit').hide();

    $('#teacher-category-edit').change(function(e){
      if (e.target.value == 3)
        $('#teacher-specialization-edit').show();
      else
        $('#teacher-specialization-edit').hide();
    });
    //users form end

    $('textarea').autoResize({
      limit:300,
      extraSpace:30,
      animate:true
    });
    /*$('textarea.description-add-material').autoResize({
      limit:600,
      extraSpace:30,
      animate:true
    });*/

    /*$(".element-of-squares-menu").mouseover(function(){
      $(this).children('.title-element-of-squares-menu').css('opacity', '1');
    });
    $(".element-of-squares-menu").mouseout(function(){
      $(this).children('.title-element-of-squares-menu').css('opacity', '0.5');
    });*/

    $('.right-functional').css('margin-left', '80%');

    $(".choice-class").select2({
      placeholder: "Класс"
    });
    $(".choice-theme-material").select2({
      maximumSelectionLength: 1,
      placeholder: "Предмет"
    });

    $(".choice-theme-material").next().children().children().addClass('my-setting-select2-selection');

    $(".type-profiles").click(function(){

      the_id = $(this).attr('id');

      if (the_id == 'all-students'){
        $('#each-students').css('display', 'block');
        $('#each-teachers').css('display', 'none');
      }
      else{
        $('#each-students').css('display', 'none');
        $('#each-teachers').css('display', 'block');
      }
    });






  $(".fancybox-thumb").fancybox({
    parent: 'body',
    prevEffect  : 'none',
    nextEffect  : 'none',
    helpers  : {
      title : {
        type: 'outside'
      },
      thumbs   : {
        width : 50,
        height   : 50
      }
    }
  });

  $('#settigns-profile').tooltip();

  $(".type-of-community").click(function(){
    $(".type-of-community").removeClass('active-type-of-community');
    $(this).addClass('active-type-of-community');
  });

  $("#close-notice").click(function(){
    $(this).parent().fadeOut();
  });


  /*$("#save-edit-profile").click(function(){
    $('.notice-content').html('Ваши данные успешно сохранены!');
    $('.notice').fadeIn();
  });

  $("#save-edit-class").click(function(){
    val = $('.input-edit-classroom-name').val();
    if(val){
      $('.notice-content').removeClass('warning').removeClass('error').html('Данные класса успешно сохранены!');
      $('.notice').fadeIn();
    }
    else{
      $('.notice-content').addClass('error').html('Вы ведь ничего не ввели в поле!');
      $('.notice').fadeIn();
    }
  });

  $("#save-edit-community").click(function(){
    val = $('.input-edit-community-name').val();
    if(val){
      $('.notice-content').removeClass('warning').removeClass('error').html('Данные сообщества успешно сохранены!');
      $('.notice').fadeIn();
    }
    else{
      $('.notice-content').addClass('error').html('Вы ведь ничего не ввели в поле!');
      $('.notice').fadeIn();
    }
  });
*/

  $('#classroom_name').change(function(){
    val = $(this).val();
    if(val){
      $('#btn-create-class').removeAttr('disabled');
    }
    else{
      $('#btn-create-class').attr('disabled', 'disabled');
    }
  });

  $('#community_name').change(function(){
    val = $(this).val();
    if(val){
      $('#btn-create-community').removeAttr('disabled');
    }
    else{
      $('#btn-create-community').attr('disabled', 'disabled');
    }
  });

  $('#join-to-community').click(function(){
    $(this).css('display', 'none');
    $(this).parent().prepend('<span>Вы с нами!</span>');
  });

  $('#join-to-class').click(function(){
    $(this).css('display', 'none');
    $(this).parent().prepend('<span>Вы с нами!</span>');
  });

  $(".useful-material_post").hover(
      function(){
        $(this).children('.wrap-autor-material').children().fadeIn(400);
      },
      function(){
        $(this).children('.wrap-autor-material').children().fadeOut(400);
  });

  $(".btn-follow").mouseover(function(){
      $(this).removeClass('btn-follow-on').removeClass('btn-primary').addClass('btn-st-red');
      $(this).html('Отмена');
  });
  $(".btn-follow").mouseout(function(){
      $(this).addClass('btn-follow-on').addClass('btn-primary').removeClass('btn-st-red');
      $(this).html('Читаю');
  });

  $('.switch').click(function(){
    if($(this).attr('src') == '/images/switch9.png'){
      $(this).attr('src', '/images/switch13.png');
      $('body').addClass('night').removeClass('day');
      $('.mike-speach').html('Хммм... Сегодня очень рано стемнело!');
    }else{
      $(this).attr('src', '/images/switch9.png');
      $('body').addClass('day').removeClass('night');
      $('.mike-speach').html('О! А вот и солнышко!');
    }
  });

}

$(document).on("page:load ready", main)
