function BookItem(props) {
    return (
        <div className="book">
            <div className="book-top">
                <img className="book-cover" src={props.backgroundImage} alt={props.title} />
                <div className="book-shelf-changer">
                    <select onChange={props.updateShelf} id={props.id}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
        </div>
    );
}

export default BookItem;