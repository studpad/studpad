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
//= require react
//= require react_ujs
//= require react_bootstrap
//= require react-dropzone
//= require sanitizer_base
//= require emotions
//= require components
//= require bootstrap-sprockets
//= require jquery.fancybox
//= require jquery.Jcrop.min
//= require jquery.form
//= require dropzone
//= require my_scripts
//= require materials
//= require homeworks
//= require selectize
//= require share_materials
//= require autoresize.jquery.min
//= require communities
//= require jquery.jplayer.min
//= require player
//= require avatar
//= require change_password
//= require notifications
//= require speech

Dropzone.autoDiscover = false;

function truncate(string, length){
  if (string.length < length){
    return string
  } else {
    return string.substr(0, length-3) + "..."
  }
}


var intervalID;
var currentUser;

var c = function(obj){//На время отладки
  console.log(obj);
};

function get_url_description(url, success_function){
  $.ajax({
    url: '/ajax/page_description',
    dataType: 'json',
    data: {url: url},
    cache: false,
    success: success_function,
    error: function(xhr, status, err) {
      console.error("Can't resolve host", status);
    }
  });
};
