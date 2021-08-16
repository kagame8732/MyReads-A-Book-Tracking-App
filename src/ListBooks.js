import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";

class ListBooks extends Component {
  render() {
    const { bookshelves, books, onMove } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>
            <strong>MyReads</strong>
          </h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((shelf) => (
              <Bookshelf
                key={shelf.key}
                shelf={shelf}
                books={books}
                onMove={onMove}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
            <button>Add a Book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
