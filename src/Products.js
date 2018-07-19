import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import ProdHome from './ProdHome'
import Categories from './Categories'

export default class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
        this.loadCategories = this.loadCategories.bind(this)
        this.insertCategory = this.insertCategory.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
        this.renderCat = this.renderCat.bind(this)
    }

    url = 'http://localhost:3001/categories'

    componentDidMount() {
        this.loadCategories()
    }

    loadCategories() {
        axios.get(this.url)
            .then(result => {
                this.setState({
                    categories: result.data
                })
            })
    }

    renderCat(cat) {
        return <li className="list-group-item" key={cat.id}><Link to={`/products/categories/${cat.id}`}>{cat.category}</Link>
            <button type="button btn-sm" onClick={() => this.deleteCategory(cat)} className="close" aria-label="close">
                <span aria-hidden="true">x</span>
            </button></li>
    }

    insertCategory(event) {
        if (event.keyCode === 13) {
            axios
                .post(this.url,
                    {
                        "category": this.refs.newCat.value
                    })
                .then(() => {
                    alert(`Category ${this.refs.newCat.value} created!`)
                    this.refs.newCat.value = ''
                    event.preventDefault()
                    this.loadCategories()
                })
        }
    }

    deleteCategory(category) {
        if (window.confirm(`Do you really want to delete ${category.category} category?`)) {
            console.log(category.id)
            axios.delete(`${this.url}/${category.id}`)
                .then(() =>  this.loadCategories())
        }
    }

    render() {
        const { match } = this.props
        const { categories } = this.state
        return (
            <div className='row'>
                <div className='col-md-2'  >
                    <h4 style={{ margin: 5 }} className="lead">Categories:</h4>
                    <ul className="list-group">
                        {categories.map(this.renderCat)}
                    </ul>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Category</span>
                        </div>
                        <input onKeyDown={this.insertCategory} ref="newCat" placeholder="Insert new one" type="text" className="form-control" aria-label="New Category" aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
                <div className='col-md-10'>
                    <Route exact path={match.url} component={ProdHome}></Route>
                    <Route exact path={`${match.url}/categories/:catId`} component={Categories}></Route>
                </div>
            </div>
        )
    }
}
