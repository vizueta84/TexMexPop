const ratingsController = require("../controllers/ratings");
const express = require("express");
const checkAuth = require("../util/checkAuth");
const router = express.Router();

router.get("/", ratingsController.getAllRestaurantRatings);

router.get("/:id", ratingsController.getRestaurantRating);

// POST create new rating by userId
router.post('/new-rating', checkAuth, ratingsController.createRating)

//PUT edit rating by userId
router.put("/:id",checkAuth, ratingsController.editRestaurantRating);

//DELETE delete rating by userId
router.delete("/:id", checkAuth, ratingsController.deleteRestaurantRating);


module.exports = router;
