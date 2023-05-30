const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

// настройка CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
  });

// app.use(express.static(__dirname + '/films'))
// app.use("/films", router)

// получаем данные для всех фильмов
// app.get("/films", function(request, response) {

//     response.sendFile('index.html', {root: __dirname })
// })

require("./back-end/routes/movie.routes")(app);

// app.use("/:movieName", router);

// получаем все сеансы для выбранного фильма
// router.get("/seances", function(request, response){
     
//     response.send("<h1>Seances</h1>");
// });
 
// получаем места на сеансе
// router.get("/:seanceCinema/:seanceDate/places", function(request, response){
     
//     response.send("<h1>Places</h1>");
// });
 
// получаем данные корзины
// app.get("/cart", function(request, response){
     
//     response.send("<h1>Cart</h1>");
// });

app.listen(port);

const db = require("./back-end/models");

//for DEBUG database
// db.sequelize.sync({force: true}).then (() => {
//     console.log(`Drop & resync DB`);
// });

//for RELEASE
db.sequelize.sync();

// db.movie.create({
//     name: "Batman vs Superman: Dawn of Justice",
//     description: "Fearing that the god-like superhero's actions will remain out of control, Gotham City's fearsome and powerful guardian takes on Metropolis' most revered savior today, while the rest of the world decides which hero it truly needs. And while Batman and Superman are at war with each other, a new threat is emerging that puts humanity in the greatest danger it has ever faced.",
//     ageRating: "16+",
//     genre: "Drama",
//     startDate: new Date(2023, 2, 12),
//     finishDate: new Date(2023, 5, 29),
//     duration: "02:33",
//     rating: 6.8,
//     countryId: 2
//   }).then(res=>{
//     console.log("ok");
//   }).catch(err=>console.log(err));
