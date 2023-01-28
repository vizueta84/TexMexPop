const restaurantController = require("../controllers/restaurants");
const express = require("express");
const checkAuth = require("../util/checkAuth");
const router = express.Router();

router.get("/", restaurantController.getAllRestaurants);

// get restaurant by id
router.get("/:id", restaurantController.getRestaurantById);

// create restaurant
router.post('/create-restaurant', checkAuth, restaurantController.createRestaurant)

// edit restaurant
router.put('/edit-restaurant/:id', checkAuth, restaurantController.editRestaurant)
// delete restaurant
router.delete('/:id', checkAuth, restaurantController.deleteRestaurant)

module.exports = router;
