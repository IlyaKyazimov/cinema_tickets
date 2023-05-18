const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

// app.use(express.static(__dirname + '/films'))
// app.use("/films", router)

// получаем данные для всех фильмов
app.get("/films", function(request, response) {

    response.sendFile('index.html', {root: __dirname })
})

// получаем все сеансы для выбранного фильма
app.get("/:movieName/seances", function(request, response){
     
    response.send("<h1>Seances</h1>");
});
 
// получаем места на сеансе
app.get("/:movieName/:seanceCinema/:seanceDate/places", function(request, response){
     
    response.send("<h1>Places</h1>");
});
 
// получаем данные корзины
app.get("/cart", function(request, response){
     
    response.send("<h1>Cart</h1>");
});

app.listen(port);