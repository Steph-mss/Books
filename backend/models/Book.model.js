const pool = require('../config/db.postgres');

const Book = {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows;
  },

  async create({ title, author }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
      [title, author]
    );
    return rows[0];
  }
};

module.exports = Book;
