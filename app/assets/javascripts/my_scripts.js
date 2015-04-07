
function main(){

      $("textarea").focus(function(){
      	 $(this).css('box-shadow', 'none').css('border', '1px solid #E8E8E8');
   	 });



      $('#central-part').css('left', '16.66666667%');

      width_all_album = $('#all-albums').width();
      var i = 1;

      while(width_all_album - i*234 > 0){
         i++;
      }
      paddingSize = (width_all_album - (i - 1)*234)/2;
      $('#all-albums').css('padding-left', paddingSize);



   	$(".js-example-basic-multiple").select2();
   	$(".choice-class").select2({
     	placeholder: "Класс"
   	});
   	$(".choice-theme").select2({
     	placeholder: "Тема"
   	});



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



      $("#textHW").focus(function(){

      	$(this).css('height', '80px').css('color', 'black');
      	$('#post-news').css('display', 'block');

      });



      $("#textHW").blur(function(){

      	val = $(this).val();
      	val = $.trim(val);

      	if(!val){
      		$('#post-news').css('display', 'none');
      		$(this).css('height', '30px');
      	}
      });



      $(".textHW_comment").focus(function(){

      	$(this).css('height', '50px').css('color', 'black');
      	$(this).next().children('.post-comment-of-news').css('display', 'block');

      });



      $(".textHW_comment").blur(function(){

      	val = $(this).val();
      	val = $.trim(val);

      	if(!val){
      		$(this).next().children('.post-comment-of-news').css('display', 'none');
      		$(this).css('height', '30px');
      	}
      });



      $(".give-comment").click(function(){

      	$(this).parent().next().css('display', 'block');
      });


      $(".pencil-news").click(function(){

      	val = $(this).parent().next().next().children().html();
      	$(this).parent().next().next().css('display', 'none');
      	$(this).parent().next().next().next().children().children('textarea').val(val);
      	$(this).parent().next().next().next().css('display', 'block');

      });



      $(".pencil-comment").click(function(){

      	val = $(this).parent().next().next().children().html();
      	$(this).parent().next().next().css('display', 'none');
      	$(this).parent().next().next().next().children().children('textarea').val(val);
      	$(this).parent().next().next().next().css('display', 'block');

      });


   $(".fancybox-thumb").fancybox({
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


}
$(document).ready(main)
$(document).on("page:load", main)
