const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars view engine and views path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Ritik",
//       age: 22,
//     },
//     {
//       name: "Sonali",
//       age: 25,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

// app.get("/", (req, res) => {
//   res.render("app", {
//     title: "Weather App",
//     name: "Ritik Rajak",
//   });
// });

app.get("/", (req, res) => {
  // console.log(req);
  res.render("index", {
    title: "Weather App",
    name: "Ritik Rajak",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ritik Rajak",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    email: "rajakritik24@gmail.com",
    name: "Ritik Rajak",
  });
});

// app.get("/help/data", (req, res) => {
//   res.send("<h2> help/data url is visited");
// });

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "Please provide a search",
//     });
//   }

//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  const add = req.query.address

  geocode(add, (geocode_error, {latitude, longitude, label} = {}) => {
    if(geocode_error) {
      return res.send({
        error: geocode_error
      })
    }
    forecast(latitude , longitude, (forecast_error, {temperature,feelslike,weather_descriptions} = {}) => {
      if(forecast_error) {
        return res.send({
          error: forecast_error
        })
      }
      res.send({
        forecast:  `The current temperature is ${temperature} degrees. It feels like ${feelslike} degrees. The weather is ${weather_descriptions} today.`,
        address: label,
        location: add
      })
    })
  })
  console.log(req.query.address);

});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help",
    name: "Ritik Rajak",
    msg: "Help page does not exist",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 page",
    name: "Ritik Rajak",
    msg: "This page does not exist",
  });
});

app.listen(port, () => {
  console.log("Server is running at port 3000");
});
