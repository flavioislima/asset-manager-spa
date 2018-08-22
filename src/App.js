import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Products from './Products'

class App extends Component {
  state = {
    categories: [],
    products: []
  }

  loadAllCategories = () => {
    this.props.api.loadAllCategories()
      .then(result => {
        this.setState({
          categories: result.data
        })
      })
  }

  loadCategory = (id) => {
    return this.props.api.loadCategories(id)
  }

  insertCategory = (value) => {
    this.props.api.insertCategory(value)
      .then(() => {
        alert(`Category ${value} created!`)
        this.loadAllCategories()
      })
  }

  editCategory = (category) => {
    return this.props.api.editCategory(category)
  }

  deleteCategory = (category) => {
    console.log(category.id)
    if (window.confirm(`Do you really want to delete ${category.category} category?`)) {
      this.props.api.deleteCategory(category.id)
        .then(() => this.loadAllCategories())
    }
  }

  loadProducts = (id) => {
    return this.props.api.loadProducts(id)
  }

  insertProduct = async (value, id) => {
    await this.props.api.insertProduct(value, id)
  }

  deleteProduct = async (prod) => {
    await this.props.api.deleteProduct(prod.id)
  }

  editProd = (prod) => {
    return this.props.api.editProd(prod)
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
                loadAllCategories={this.loadAllCategories}
                loadCategories={this.loadCategory}
                insertCategory={this.insertCategory}
                deleteCategory={this.deleteCategory}
                loadProducts={this.loadProducts}
                insertProduct={this.insertProduct}
                deleteProduct={this.deleteProduct}
                editCategory={this.editCategory}
                editProd={this.editProd}
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
