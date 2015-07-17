function init_player(){
  var audio_url = $(this).attr('data')
  var audio_id = $(this).attr('audio')
  $(this).jPlayer({
    ready: function () {
      console.log("set " + audio_id)
      $('div[audio=' + audio_id + ']').jPlayer("setMedia", {
        mp3: audio_url
      });
    },
    cssSelectorAncestor: "div[play=audio" +  audio_id + "]"
  });
}

$(document).on("page:load ready", function(){
  $(".jp-jplayer").each(init_player)

});
