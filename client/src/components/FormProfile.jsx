import React, { useState, useEffect } from "react";
import API from "../api";

const genres = ["Amour", "Drame", "Aventure", "Science-fiction", "Fantasy"];

function FormProfile({ onSubmit, initialData = {} }) {
  const [preferences, setPreferences] = useState(initialData.preferences || []);
  const [history, setHistory] = useState(initialData.history || []);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (initialData) {
      setPreferences(initialData.preferences || []);
      setHistory(initialData.history || []);
    }
  }, [initialData]);

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des livres :", error);
    }
  };

  const handlePreferenceChange = (e) => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPreferences(value);
  };

  const handleAddBookToHistory = () => {
    if (selectedBook && rating > 0) {
      const newHistory = [...history, { book: selectedBook, rating }];
      setHistory(newHistory);
      setSelectedBook("");
      setRating(0);
    }
  };

  const handleRemoveBookFromHistory = (bookTitle) => {
    const newHistory = history.filter((item) => item.book !== bookTitle);
    setHistory(newHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ preferences, history });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Préférences (genres)</label>
        <select multiple value={preferences} onChange={handlePreferenceChange}>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Historique de lecture</label>
        <div>
          <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
            <option value="">-- Choisir un livre --</option>
            {books.map((book) => (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value, 10))}
            min="0"
          />
          <button type="button" onClick={handleAddBookToHistory}>
            Ajouter
          </button>
        </div>
        <ul>
          {history.map((item) => (
            <li key={item.book}>
              {item.book} (lu {item.rating} fois)
              <button type="button" onClick={() => handleRemoveBookFromHistory(item.book)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData._id ? "Mettre à jour le profil" : "Créer le profil"}
      </button>
    </form>
  );
}

export default FormProfile;