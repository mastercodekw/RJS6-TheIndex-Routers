import React from "react";
import BookRow from "./BookRow";
import SearchBar from "./SearchBar";
import { faThumbsDown, faBorderNone } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import BookTable from "./BookTable";

export default class BookList extends React.Component {
  state = {
    filteredBooks: this.props.books,
    loading: true
  };

  filterBooks = query => {
    let filteredBooks = this.props.books.filter(book => {
      return book.title.toLowerCase().includes(query.toLowerCase());
    });

    if (this.props.match.params.colorID) {
      const color = this.props.match.params.colorID;
      filteredBooks = filteredBooks.filter(book => book.color === color);
    }

    this.setState({ filteredBooks: filteredBooks, loading: false });
  };

  filterByColor = color => {
    const filteredBooks = this.props.books.filter(book => book.color === color);
    this.setState({ filteredBooks: filteredBooks, loading: false });
  };

  componentDidMount() {
    if (this.props.match.params.colorID) {
      this.filterByColor(this.props.match.params.colorID);
    }

    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.colorID) {
      const color = this.props.match.params.colorID;
      if (prevProps.match.params.colorID !== color) {
        this.filterByColor(color);
      }
    } else {
      const books = this.props.books;
      if (this.state.filteredBooks !== books) {
        this.setState({ filteredBooks: books, loading: false });
      }
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div className="booklist">
          <h1>Books</h1>
          <SearchBar onChange={this.filterBooks} />
          <BookTable books={this.state.filteredBooks} />
        </div>
      );
    }
  }
}
