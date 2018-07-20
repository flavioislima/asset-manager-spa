import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Products from './Products'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      products: []
    }
    this.loadAllCategories = this.loadAllCategories.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.insertCategory = this.insertCategory.bind(this)
    this.loadProducts = this.loadProducts.bind(this)
    this.insertProduct = this.insertProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  loadAllCategories() {
    this.props.api.loadAllCategories()
      .then(result => {
        this.setState({
          categories: result.data
        })
      })
  }

  insertCategory(value) {
    this.props.api.insertCategory(value)
      .then(() => {
        alert(`Category ${value} created!`)
        this.loadAllCategories()
      })
  }

  deleteCategory(category) {
    console.log(category.id)
    if (window.confirm(`Do you really want to delete ${category.category} category?`)) {
      this.props.api.deleteCategory(category.id)
        .then(() => this.loadAllCategories())
    }
  }

  loadProducts(id) {
    this.props.api.loadProducts(id)
      .then(result => {
        console.log(result.data)
        this.setState({
          products: result.data
        })
      })
  }

  async insertProduct(value, id) {
    await this.props.api.insertProduct(value, id)
  }

  async deleteProduct(prod) {
    console.log(prod.id)
    await this.props.api.deleteProduct(prod.id)
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Product Manager</a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/about' component={About}></Route>
          <Route path='/products' render={(props) => {
            return (
              <Products {...props}
                categories={this.state.categories}
                products={this.state.products}
                loadCategories={this.loadAllCategories}
                insertCategory={this.insertCategory}
                deleteCategory={this.deleteCategory}
                loadProducts={this.loadProducts}
                insertProduct={this.insertProduct}
                deleteProduct={this.deleteProduct}
              />
            )
          }
          }></Route>
        </div>
      </Router>
    )
  }
}

export default App
