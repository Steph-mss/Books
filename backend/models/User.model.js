const pool = require('../config/db.postgres');

const User = {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  },

  async create({ name, email }) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  }
};

module.exports = User;
