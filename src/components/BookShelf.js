import { getAll, update } from '../BooksAPI';
import { useState, useEffect } from "react";
import BookItem from './BookItem';
import { useDispatch, useSelector } from 'react-redux';
import { saveBooks } from '../bookSlice';

function BookShelf(props) {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const booksResponse = useSelector((state) => state.books.books);

    useEffect(() => {
        getAll().then((data) => {
            setIsLoading(false);
            dispatch(saveBooks({ books: data }));
        });
    }, []);

    function updateShelfFn(e) {
        update(e.target.id, e.target.value).then((data) => {
            getAll().then((data) => {
                dispatch(saveBooks({ books: data }));
            });
        });
    }


    if (isLoading) {
        return (
            <section>
                <p>...loading</p>
            </section>
        );
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <li>
                        {booksResponse.filter((book) => book.shelf === props.shelf).map((book) => <BookItem
                            key={book.id}
                            backgroundImage={book.imageLinks.smallThumbnail}
                            title={book.title}
                            author={book.authors[0]}
                            id={book.id}
                            updateShelf={updateShelfFn}
                        />)}
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;