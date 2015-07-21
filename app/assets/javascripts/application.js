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
//= require news
//= require communities
//= require jquery.jplayer.min
//= require join
//= require player
//= require avatar
//= require change_password
//= require notifications

Dropzone.autoDiscover = false;

function truncate(string, length){
  if (string.length < length){
    return string
  } else {
    return string.substr(0, length-3) + "..."
  }
}
