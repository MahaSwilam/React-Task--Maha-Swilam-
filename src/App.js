import "./App.css";
import { useState } from "react";
import { getAll, search, update } from './BooksAPI';
import BookShelf from "./components/BookShelf";
import BookItem from './components/BookItem';
import { useDispatch } from "react-redux";
import { saveBooks } from "./bookSlice";

function App() {
  const dispatch = useDispatch();

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [searchResponse, setsearchResponse] = useState([]);

  const handleSearchValueChange = (e) => {
    search(e.target.value, 10).then((data) => {
      setsearchResponse(data);
    });
  }

  const updateShelfFn = (e) => {
    update(e.target.id, e.target.value).then((data) => {
      getAll().then((data) => {
        dispatch(saveBooks({ books: data }));
      });
    });
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="search"
                placeholder="Search by title, author, or ISBN" onChange={handleSearchValueChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              <li>
                {searchResponse && searchResponse.length > 0 && searchResponse.map((book) => <BookItem
                  key={book?.id}
                  backgroundImage={book?.imageLinks.smallThumbnail}
                  title={book?.title}
                  author={book?.authors && book?.authors[0]}
                  id={book?.id}
                  updateShelf={updateShelfFn} />)}
              </li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf title="Currently Reading" shelf="currentlyReading" />
              <BookShelf title="Want to Read" shelf="wantToRead" />
              <BookShelf title="Read" shelf="read" />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
