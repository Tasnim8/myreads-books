import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookComponent from './bookComponant.js'
import SearchResult from './searchResult.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    query:'',
    results:[],
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

  updateBook = (book,shelf) =>{
    BooksAPI.update(book,shelf);
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

  updateQuery = (query)=>{
    if(query!==''){
    this.setState({query:query})
    BooksAPI.search(query.trim()).then((results)=>{
      if(results.error){
        this.setState({results:[]})
      }
      else{
        this.setState({results:results})
      }
    })
  }
  else{
    this.setState({query: ''})
  }
  }

clearResults=()=>{
  this.setState({query: '',results:[]})
}

  render() {
    return (
      <div className="app">

      <Route exact path="/AddBook" render={()=>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={this.clearResults}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"  onChange={(event)=>this.updateQuery(event.target.value)}/>
              </div>
            </div>

            {this.state.query!=='' && this.state.results.length !==0 &&
            <div className="search-books-results">
            <ol className="books-grid">
            {
              this.state.results.map((result)=>(
                  <SearchResult key={result.id} result={result} books={this.state.books} onChangeShelf={this.updateBook} />

              ))
            }
            </ol>
            </div>
            }
            </div>
          )}/>



          <Route exact path="/"  render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <BookComponent books={this.state.books} shelf="currentlyReading" onChangeShelf={this.updateBook}/>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <BookComponent books={this.state.books} shelf="wantToRead" onChangeShelf={this.updateBook}/>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <BookComponent books={this.state.books} shelf="read" onChangeShelf={this.updateBook}/>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/AddBook" onClick={this.clearResults}>Add a book</Link>
            </div>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
