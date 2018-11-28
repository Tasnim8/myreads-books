import React from 'react'
import PropTypes from 'prop-types'

class SearchResult extends React.Component{

getShelf(book){
  let books=this.props.books;
  let found=false;
  for (var i = 0; i < books.length; i++) {
    if (books[i].id===book.id) {
      found=books[i].shelf;
    }
  }
  return found;
}

  render(){
    return(
        <li>
        <div className="book">
        <div className="book-top">
        {
          this.props.result.imageLinks ?
          (
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${this.props.result.imageLinks.thumbnail})` }}></div>
          ):(
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${this.props.result.previewLink})` }}></div>
          )
        }
        <div className="book-shelf-changer">
        {this.getShelf(this.props.result)?(
          <select value={this.getShelf(this.props.result)} onChange={(event) => this.props.onChangeShelf(this.props.result,event.target.value)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none" >None</option>
          </select>
        ):(
          <select value="none" onChange={(event) => this.props.onChangeShelf(this.props.result,event.target.value)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none" >None</option>
          </select>
        )}
        </div>
        </div>
        <div className="book-title">{this.props.result.title}</div>
        <div className="book-authors">{this.props.result.authors}</div>
        </div>
        </li>
    )
  }

}

SearchResult.propTypes={
  books:PropTypes.array.isRequired,
  onChangeShelf:PropTypes.func.isRequired,
  result:PropTypes.object.isRequired
}

export default SearchResult
