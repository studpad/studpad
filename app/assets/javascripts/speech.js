var speeches = [
'Здравствуйте! Наконец-то Вы к нам заглянули. Чай? Кофе?',
'Сегодня большая облачность. Добрый день!',
'На такой высоте я вижу полностью свой родной город.',
'Сегодня утром я покрасил свой самолет! Блестит?',
"Смотрите, что я нашел! Откройте ссылку <a href='https://youtu.be/h_UhKcAy6xc' \
target='blank'>https://youtu.be/h_UhKcAy6xc</a> и коснитесь центра экрана.",
"Вдохновляющая и очень интересная речь Курта Воннегута выпускникам. <a href='https://youtu.be/-I-abFNeSs0' \
target='blank'>Жмите сюда!</a>",
"Первому учителю, с любовью... <a href='https://youtu.be/VIeRRiy6wSg' \
target='blank'>Видео для Вас</a>",
'Когда я был маленьким, я мечтал стать летчиком! Как видите, мечты сбываются.'
];
randomInt = function (n) {return Math.floor(Math.random() * n);}

$(document).on("page:load ready", function() {
  $('.mike-speach').html(speeches[randomInt(speeches.length)])
})



