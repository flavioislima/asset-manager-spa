import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdHome from './ProdHome'
import Categories from './Categories'

export default class Products extends Component {
    state = {
        editingCat: ''
    }

    componentDidMount() {
        this.props.loadAllCategories()
    }

    insertCategory = (event) => {
        if (event.keyCode === 13) {
            this.props.insertCategory(this.refs.newCat.value)
            this.refs.newCat.value = ''
        }
    }

    renameCategory = (key) => {
        if (key.keyCode === 13) {
            this.props.editCategory({
                id: this.state.editingCat,
                category: this.refs['cat-' + this.state.editingCat].value
            })
                .then(() => {
                    this.setState({
                        editingCat: ''
                    })
                    this.props.loadCategories()

                })
        }
    }

    handleEditCategory = (category) => {
        this.setState({
            editingCat: category.id
        })
    }

    cancelEditing = () => {
        this.setState({
            editingCat: ''
        })
    }

    renderCat = (cat) => {
        return (
            <li className="list-group-item" key={cat.id}>
                {this.state.editingCat === cat.id &&
                    <div className="input-group">
                        <div className="input-group-btn"><span>
                            <input onKeyDown={this.renameCategory} ref={'cat-' + cat.id} defaultValue={cat.category} type="text" className="form-control" aria-label="Edit Category" aria-describedby="inputGroup-sizing-default" />
                            <button className="btn btn-primary" onClick={this.cancelEditing}>Cancel</button></span>
                        </div>
                    </div>
                }
                {this.state.editingCat !== cat.id &&
                    <div>
                        <Link to={`/products/categories/${cat.id}`}>{cat.category}</Link>
                        <button type="button btn-sm" onClick={() => this.props.deleteCategory(cat)} className="close" aria-label="delete">
                            <span aria-hidden="true">&times;</span></button>
                        <button type="button btn-sm" onClick={() => this.handleEditCategory(cat)} className="close" aria-label="delete">
                            <span aria-hidden="true" className="glyphicon glyphicon-pencil">e</span>
                        </button>
                    </div>
                }
            </li>
        )
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
                        <input onKeyDown={this.insertCategory} ref="newCat" placeholder="Insert Category" type="text" className="form-control" aria-label="New Category" aria-describedby="inputGroup-sizing-default" />
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
                                categories={this.props.categories}
                                loadCategories={this.props.loadCategories}
                                editProd={this.props.editProd}
                            />
                        )
                    }}>
                    </Route>
                </div>
            </div>
        )
    }
}
