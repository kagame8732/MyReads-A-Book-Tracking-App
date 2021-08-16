import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBooksInput from "./SearchBooksInput";
import SearchResults from "./SearchResults";

class SearchBooks extends Component {
  render() {
    const {
      searchBooks,
      myBooks,
      onResetSearch,
      onSearch,
      onMove,
    } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={onResetSearch}>
              Close
            </button>
          </Link>
          <SearchBooksInput onSearch={onSearch} />
        </div>
        <SearchResults
          searchBooks={searchBooks}
          myBooks={myBooks}
          onMove={onMove}
        />
      </div>
    );
  }
}

export default SearchBooks;
