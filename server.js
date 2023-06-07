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
require("./back-end/routes/seance.routes")(app);
require("./back-end/routes/place.routes")(app);
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

// for(let i = 0; i < 7; i++) {
//   db.seance.create({
//       date: new Date(2023, 5, 2),
//       time: "22:10",
//       price: 300,
//       cinemaId: i + 1,
//       placesInfoId: i + 43, // +7
//       movieId: 1
//     }).then(res=>{
//       console.log("ok");
//     }).catch(err=>console.log(err));
// } 

// for(let i = 0; i < 35; i++) {
//   db.placesInfo.create({
//     total: 64,
//     free: 64,
//     busy: 0
//   }).then(res=>{
//     console.log("ok");
//   }).catch(err=>console.log(err));
// } 
