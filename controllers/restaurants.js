const instance = require("../util/connection");

const getAllRestaurants = (req, res) => {
  console.log(req);
  const sql = "SELECT * FROM restaurants";

  instance.query(sql, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(results);
  });
};

const getRestaurantById = (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM ?? WHERE ?? = ?`;
  let replacement = ["restaurants", "id", id];
  instance.query(sql, replacement, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(results);
  });
};

const createRestaurant = (req, res) => {
  const { restaurant_name, link, description, address, city, state, zip } =
    req.body;
  // console.log(req, "this is the request");
  const sql = `
    INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??)
    VALUES (?,?,?,?,?,?,?)
  `;
  const replacements = [
    "restaurants",
    "restaurant_name",
    "link",
    "description",
    "address",
    "city",
    "state",
    "zip",
    restaurant_name,
    link,
    description,
    address,
    city,
    state,
    zip,
  ];
  instance.query(sql, replacements, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

const editRestaurant = (req, res) => {
  const { restaurant_name, link, description, address, city, state, zip } =
    req.body;
  const { id } = req.params;
  // console.log(req, "this is the request");
  const sql = `
    UPDATE restaurants SET 
      restaurant_name = ?,
      link = ?, 
      description = ?, 
      address = ?, 
      city = ?, 
      state = ?, 
      zip = ?
    WHERE (id = ?);
  `;
  const replacements = [
    restaurant_name,
    link,
    description,
    address,
    city,
    state,
    zip,
    id,
  ];
  instance.query(sql, replacements, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

const deleteRestaurant = (req, res) => {
  const { id } = req.params;
  // console.log(req, "this is the request");
  const sql = `
    DELETE FROM restaurants WHERE (id = ?);
  `;
  const replacements = [id];
  instance.query(sql, replacements, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
};
