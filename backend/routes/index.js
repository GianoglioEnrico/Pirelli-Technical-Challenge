const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const measurements = req.measurements;
  const queryFilters = req.query;
  const filteredCar = measurements.filter((measure) => {
    return queryFilters.car.includes(measure.Car_id);
  });

  res.json(filteredCar);
});

module.exports = router;
