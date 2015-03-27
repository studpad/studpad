// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets

$(document).ready(function(){
   $("textarea").focus(function(){
   	 $(this).css('box-shadow', 'none').css('border', '1px solid #E8E8E8');
	 });
});

$(document).ready(function(){
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
});

$(document).ready(function(){
   $("#textHW").focus(function(){
   	
   	$(this).css('height', '80px').css('color', 'black');
   	$('#post-news').css('display', 'block');

   });
});

$(document).ready(function(){
   $("#textHW").blur(function(){
   	
   	val = $(this).val();
   	val = $.trim(val);

   	if(!val){
   		$('#post-news').css('display', 'none');
   		$(this).css('height', '30px');
   	}
   });
});

$(document).ready(function(){
   $(".textHW_comment").focus(function(){

   	$(this).css('height', '50px').css('color', 'black');
   	$(this).next().children('.post-comment-of-news').css('display', 'block');

   });
});

$(document).ready(function(){
   $(".textHW_comment").blur(function(){
   	
   	val = $(this).val();
   	val = $.trim(val);

   	if(!val){
   		$(this).next().children('.post-comment-of-news').css('display', 'none');
   		$(this).css('height', '30px');
   	}
   });
});

$(document).ready(function(){
   $(".give-comment").click(function(){
   	
   	$(this).parent().next().css('display', 'block');
   });
});

$(document).ready(function(){
   $(".pencil-news").click(function(){
   	
   	val = $(this).parent().next().next().children().html();
   	$(this).parent().next().next().css('display', 'none');
   	$(this).parent().next().next().next().children().children('textarea').val(val);
   	$(this).parent().next().next().next().css('display', 'block');
   	
   });
});

$(document).ready(function(){
   $(".pencil-comment").click(function(){
   	
   	val = $(this).parent().next().next().children().html();
   	$(this).parent().next().next().css('display', 'none');
   	$(this).parent().next().next().next().children().children('textarea').val(val);
   	$(this).parent().next().next().next().css('display', 'block');
   	
   });
});

$(document).ready(function(){
	 left_val = $('#list-subjects').width();
   $('#central-part').css('left', left_val);
});
