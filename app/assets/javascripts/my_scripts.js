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

    
    $('.usual-post-text-expand-span').click(function(){
      alert('sf');
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
    $('.textarea-form-control-comment').css('height', '30px');

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


  $.emojiarea.path = '/';
  $.emojiarea.icons = {
      ':smiley:'         : 'smile1.png',
      ':blush:'          : 'smile2.png',
      ':wink:'           : 'smile4.png',
      ':yum:'            : 'smile9.png',
      ':relieved:'       : 'smile8.png',
      ':laughing:'       : 'smile7.png',
      ':sunglasses:'     : 'smile5.png',
      ':grin:'           : 'smile6.png',
      ':thumbsup:'       : 'thumbsup.png',
      ':clap:'           : 'applause.png',

  };


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
  $('.btn').tooltip();

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



  //открыть КАК ЭТО РАБОТАЕТ
  $('.start-how-does-it-work').click(function(){
    $('#hat-studpad').css('z-index', '900');
    window.location = '#';
    $('.dark-background-for-how-does-it-work, .description-hdiw').css('display', 'block');
    $('.wrap-mike').css('z-index', '2000');
    $('.description-hdiw').css('z-index', '1050');
    $('.its-all-hdiw').css('display', 'none');
  });

  //закрыть КАК ЭТО РАБОТАЕТ
  $('.close-how-does-it-work, .its-all-hdiw').click(function(){
    $('#hat-studpad').css('z-index', '1001');

    $('.dark-background-for-how-does-it-work, .description-hdiw').css('display', 'none');
    $('.wrap-mike, .post-container, #profile_user, .first-left-block, .follow-offer, .title-background, .new-post-buttons').css('z-index', '999');

    var newAttrData = 'publications';
    $('.next-episode-how-does-it-work').data('episode', newAttrData).attr('data-episode', newAttrData);
    $('.next-episode-how-does-it-work').css('display', 'inline');

    var description = "Знакомьтесь, это Михал Палыч. Веселее, дружелюбнее и щедрее летчика мы еще не видели! Он будет с вами делиться историями, ссылками, музыкой и даже видеороликами.";
    $('.description-hdiw').addClass('description-hdiw-mike-speach').removeClass('description-hdiw-publications').removeClass('description-hdiw-me').removeClass('description-hdiw-last-publicators').removeClass('description-hdiw-recommend-people').removeClass('description-hdiw-panel-publications').html(description);
  });

  //сменить эпизод КАК ЭТО РАБОТАЕТ
  $('.next-episode-how-does-it-work').click(function(){
    var nextStation = $(this).data('episode');

    if(nextStation == 'publications'){
      var description = "Здесь Вы можете увидеть все публикации коллег Вашей специализации. Вы можете оставить комментарий или же просто сказать спасибо, ведь публиковали именно для Вас! Если Вы хотите получать больше публикаций, для этого читайте больше людей!";
      $('.wrap-mike').css('z-index', '999');
      $('.post-container').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-mike-speach').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'me';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'me'){
      var description = "Здесь все просто! Это ссылка на Ваш микроблог.";
      $('.post-container').css('z-index', '999').css('position', 'static');
      $('#profile_user').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-publications').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'last-publicators';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'last-publicators'){
      var description = "Те, кто разместил публикации сегодня, попадают сюда. Хотите, чтобы Вас заметили? Публикуйте чаще.";
      $('#profile_user').css('z-index', '999').css('position', 'static');
      $('.first-left-block').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-me').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'recommend-people';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'recommend-people'){
      var description = "После регистрации Вам доступны публикации только тех, кто имеет одинаковую с Вами специализацию . Если Вы хотите получать больше интересных публикаций , то выбирайте и читайте тех, кто Вам интересен. Тогда Вы будете видеть всё, что они опубликовали у себя в микроблоге.";
      $('.first-left-block').css('z-index', '999');
      $('.follow-offer').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-last-publicators').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'panel-publications';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'panel-publications'){
      var description = "А теперь настало время что-нибудь опубликовать! Это очень просто. Кликните на один из 4 видов публикации и создайте её! Вы можете публиковать все, что угодно, ведь это Ваш микроблог.";
      $('.follow-offer').css('z-index', '999').css('position', 'static');
      $('.title-background, .new-post-buttons').css('z-index', '1000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-recommend-people').addClass('description-hdiw-' + nextStation).html(description);
      $(this).css('display', 'none');
      $('.its-all-hdiw').css('display', 'inline');
    }
  });
}

$(document).on("page:load ready", main)
