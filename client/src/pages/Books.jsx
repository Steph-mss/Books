import React, { useState, useEffect } from 'react';
import API from '../api';
import FormBook from '../components/FormBook';
import DataList from '../components/DataList';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await API.get('/books');
    setBooks(response.data);
  };

  const addBook = async (bookData) => {
    await API.post('/books', bookData);
    fetchBooks();
  };

  return (
    <div>
      <h1 className="page-title">Books</h1>
      <div className="card">
        <FormBook onSubmit={addBook} />
      </div>
      <div className="card">
        <DataList data={books} />
      </div>
    </div>
  );
}

export default Books;
