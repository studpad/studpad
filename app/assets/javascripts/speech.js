var speeches = [
'Взгляните на этого <a href="/profile">замечательного человека!</a>',
'Представляете, а уже скоро Новый год.',
'Хммммм... Это похоже на кнопку. Нажмем? <img class="switch" src="/images/button_speech.png" width="20" />',
"Смотрите, что я нашел! Откройте ссылку <a href='https://youtu.be/h_UhKcAy6xc' \
target='blank'>https://youtu.be/h_UhKcAy6xc</a> и коснитесь центра экрана.",
"Вдохновляющая и очень интересная речь Курта Воннегута выпускникам. <a href='https://youtu.be/-I-abFNeSs0' \
target='blank'>Жмите сюда!</a>",
"Первому учителю, с любовью... <a href='https://youtu.be/VIeRRiy6wSg' \
target='blank'>Видео для Вас</a>",
"Я Вам улыбаюсь :) Улыбнитесь мне и Вы!"
];
randomInt = function (n) {return Math.floor(Math.random() * n);}

$(document).on("page:load ready", function() {
  $('.mike-speach').html(speeches[randomInt(speeches.length)]);
  $('.switch').click(function(){
	    $('body').addClass('night').removeClass('day');
	    $('.mike-speach').html('Упс! Мы погасили свет. У Вас есть фонарик или свечи?');
	});
})



