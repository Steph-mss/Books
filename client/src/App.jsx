import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './pages/Users';
import Books from './pages/Books';
import Profiles from './pages/Profiles';
import UserFull from './pages/UserFull';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/profiles">Profiles</Link>
            </li>
            <li>
              <Link to="/user-full">Full User Info</Link>
            </li>
          </ul>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/books" element={<Books />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/user-full" element={<UserFull />} />
            <Route path="/" element={<h1 className="page-title">Welcome to Bookly+</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
