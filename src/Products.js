import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdHome from './ProdHome'
import Categories from './Categories'

export default class Products extends Component {
    constructor(props) {
        super(props)
        this.insertCategory = this.insertCategory.bind(this)
        this.renderCat = this.renderCat.bind(this)
    }

    componentDidMount() {
        this.props.loadCategories()
    }

    loadCategories() {
        this.props.loadCategories()
    }

    renderCat(cat) {
        return <li className="list-group-item" key={cat.id}><Link to={`/products/categories/${cat.id}`}>{cat.category}</Link>
            <button type="button btn-sm" onClick={() => this.props.deleteCategory(cat)} className="close" aria-label="close">
                <span aria-hidden="true">x</span>
            </button></li>
    }

    insertCategory(event) {
        if (event.keyCode === 13) {
            this.props.insertCategory(this.refs.newCat.value)
            this.refs.newCat.value = ''
        }
    }

    render() {
        const { match, categories } = this.props
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
                    <Route exact path={`${match.url}/categories/:catId`} render={(props) => {
                        return (
                            <Categories {...props}
                                loadProducts={this.props.loadProducts}
                                insertProduct={this.props.insertProduct}
                                deleteProduct={this.props.deleteProduct}
                            />
                        )
                    }}>
                    </Route>
                </div>
            </div>
        )
    }
}
