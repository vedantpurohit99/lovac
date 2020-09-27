const neatCsv = require('neat-csv');
const path = require('path');
const fs = require('fs');
var express = require('express');
var router = express.Router();

var cities = {}
var vaccinated = {}
fs.readFile(path.join(__dirname, '../pop_data.csv'), async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const pops = await neatCsv(data)

  pops.forEach(pop => {
    cities[pop['NAME'].toLowerCase() + ', ' + pop['STNAME'].toLowerCase()] = pop['POPESTIMATE2019']
  });
})


router.get('/', function(req, res, next) {
  if (req.query.name) {
    res.send(cities[req.query.name]);
  } else {
    res.send(cities);
  }
});

router.get('/cities', (req, res, next) => {
  res.send(Object.keys(cities))
})

router.get('/risks', (req, res, next) => {
  let pop = cities[req.query.name]
  let risk
  if (pop > 1000000) {
    risk = 'high'
  } else if (pop > 300000) {
    risk = 'moderate'
  } else {
    risk = 'low'
  }
  let low = pop * 0.6
  let high = pop * 0.7

  res.send({
    'risk': risk,
    'low': low,
    'high': high,
    'pop': pop,
    'vaccinated': vaccinated[req.query.name] ? vaccinated[req.query.name] : 0
  })
})

router.post('/add', (req, res, next) => {
  const body = req.body
  cities[body.city] = body.pop
  res.send(body)
})

router.post('/vaccine', (req, res, next) => {
  const body = req.body
  vaccinated[body.city] = (vaccinated[body.city] ? vaccinated[body.city] : 0) + 1
  res.send(body)
})

module.exports = router;