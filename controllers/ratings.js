const instance = require("../util/connection");

const getAllRestaurantRatings = (req, res) => {
  const sql = `
    SELECT DISTINCT res.*, (
        SELECT COALESCE(avg(rat.rating), 0)
        from ratings as rat
        WHERE res.id = rat.restaurant_id
    ) as rating
    FROM restaurants as res;
    `;

  instance.query(sql, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(results);
  });
};

const getRestaurantRating = (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT DISTINCT res.*, (
      SELECT COALESCE(avg(rat.rating), 0)
      from ratings as rat
      WHERE res.id = rat.restaurant_id
  ) as rating
  FROM restaurants as res
  WHERE res.id = ?;
  `;
  const replacement = [id];

  instance.query(sql, replacement, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(results);
  });
};

const createRating = (req, res) => {
  const { restaurant_id, rating } = req.body;
  const { user_id } = req.userInfo;
  const sql = `
  INSERT INTO ratings (restaurant_id, user_id, rating)
  VALUES (?,?,?)
  `;
  const replacements = [restaurant_id, user_id, rating];

  instance.query(sql, replacements, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

const editRestaurantRating = (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const sql = `
    UPDATE ratings SET rating = ?
    WHERE (rating_id = ?);
  `;
  const replacements = [rating, id];

  instance.query(sql, replacements, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(results);
  });
};

const deleteRestaurantRating = (req, res) => {
  const { rating_id } = req.params;
  const sql = `
    DELETE FROM ratings WHERE (rating_id = ?);
  `;
  const replacement = [rating_id];

  instance.query(sql, replacement, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(results);
  });
};

module.exports = {
  getAllRestaurantRatings,
  getRestaurantRating,
  createRating,
  editRestaurantRating,
  deleteRestaurantRating,
};
