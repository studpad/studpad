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
   	
   	$(this).css('height', '80px');
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
	 left_val = $('#list-subjects').width();
   $('#central-part').css('left', left_val);
});
