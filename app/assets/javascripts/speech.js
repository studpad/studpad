var speeches = [
'Взгляните на этого <a href="/profile">замечательного человека!</a>',
'Хммммм... Это похоже на кнопку. Нажмем? <img class="switch" src="/images/button_speech.png" width="20" />',
"Смотрите, что я нашел! Откройте ссылку <a href='https://youtu.be/h_UhKcAy6xc' \
target='blank'>https://youtu.be/h_UhKcAy6xc</a> и коснитесь центра экрана.",
"Вдохновляющая и очень интересная речь Курта Воннегута выпускникам. <a href='https://youtu.be/-I-abFNeSs0' \
target='blank'>Жмите сюда!</a>",
"Если девушка не помнит, где оставила резинку для волос, это не значит, что она забыла, что ты говорил ей 6 месяцев назад в 17:43.",
"В параллельной вселенной люди не грабят банки, банки сами грабят людей. А нет... это в этой."
];
randomInt = function (n) {return Math.floor(Math.random() * n);}

$(document).on("page:load ready", function() {
  $('.mike-speach').html(speeches[randomInt(speeches.length)]);
  $('.switch').click(function(){
	    $('body').addClass('day').removeClass('night');
	    $('.mike-speach').html('О! Светло, даже глаза слепит)');
	});
})


