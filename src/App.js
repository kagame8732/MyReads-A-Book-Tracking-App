import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import { debounce } from "throttle-debounce";
import SearchBooks from "./SearchBooks";

const bookshelves = [
  { key: "currentlyReading", name: "Currently Reading" },
  { key: "read", name: "Read" },
  { key: "wantToRead", name: "Want to Read" },
];
class BooksApp extends Component {
  state = {
    myBooks: [],
    searchBooks: [],
    error: false,
  };
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch((err) => {
      this.setState({ error: true });
    });
    if (shelf === "none") {
      this.setState((prevState) => ({
        myBooks: prevState.myBooks.filter((b) => b.id !== book.id),
      }));
    } else {
      book.shelf = shelf;
      this.setState((prevState) => ({
        myBooks: prevState.myBooks.filter((b) => b.id !== book.id).concat(book),
      }));
    }
  };
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ myBooks: books });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  searchForBooks = debounce(200, false, (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });
  
  render() {
    const { myBooks, searchBooks, error } = this.state;
    if (error) {
      return <div>Please wait ...</div>;
    }
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookshelves={bookshelves}
              books={myBooks}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              searchBooks={searchBooks}
              myBooks={myBooks}
              onSearch={this.searchForBooks}
              onResetSearch={this.resetSearch}
              onMove={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
