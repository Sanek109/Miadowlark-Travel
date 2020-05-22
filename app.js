const express = require('express');
const app = express();

// Добавляем промежуточное ПО
app.use(express.static(__dirname + '/public'));

// создаём механизм представления(handlebars) и настраивает Express для его использования по умолчанию
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/about', (req, res) => {
    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', {fortune: randomFortune});
});

app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

const fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.", "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];

app.listen(app.get('port'), () => {
    console.log(`Express has been started on http://localhost:${app.get('port')}: click Ctrl + C for end!`)
})

