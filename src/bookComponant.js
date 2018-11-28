import React from 'react'
import PropTypes from 'prop-types'

class BookComponent extends React.Component{
  render(){
    let books=this.props.books;
    let shelf=this.props.shelf;
    let filteredBooks=books.filter((book)=>book.shelf === shelf)
    return (
      filteredBooks.map((book)=>(
        <li key={book.id} >
        <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>
        <div className="book-shelf-changer">
        <select value={shelf} onChange={(event) => this.props.onChangeShelf(book,event.target.value)}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none" >None</option>
        </select>
        </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
        </div>
        </li>
      ))
      )
  }
}

BookComponent.propTypes={
  books:PropTypes.array.isRequired,
  onChangeShelf:PropTypes.func.isRequired,
  shelf:PropTypes.string.isRequired
}

export default BookComponent
