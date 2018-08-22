import React, { Component } from 'react'

export default class Categories extends Component {
    state = {
        products: [],
        categories: [],
        editingProd: ''
    }

    componentDidMount() {
        const id = this.props.match.params.catId
        this.loadData(id)
    }

    componentWillReceiveProps(newProps) {
        const id = newProps.match.params.catId
        this.loadData(id)
    }
    loadData = (id) => {
        this.props.loadProducts(id)
            .then(result => {
                this.setState({
                    products: result.data
                })
            })
        this.props.loadCategories(id)
            .then(r => this.setState({
                categories: r.data
            }))
    }


    insertProd = (event) => {
        const id = this.props.match.params.catId

        if (event.keyCode === 13) {
            this.props.insertProduct(this.refs.newProd.value, id)
                .then(() => {
                    this.refs.newProd.value = ''
                    this.loadData(id)
                })
        }
    }

    deleteProd = (prod) => {
        if (window.confirm(`Do you want to delete ${prod.name}?`)) {
            this.props.deleteProduct(prod)
                .then(async () => {
                    const id = this.props.match.params.catId
                    await this.loadData(id)
                    alert(`Product ${prod.name} deleted!`)
                })
        }
    }

    renameProd = (key) => {
        const id = this.props.match.params.catId
        if (key.keyCode === 13) {
            this.props.editProd({
                id: this.state.editingProd,
                category: this.state.categories[0].id,
                name: this.refs['prod-' + this.state.editingProd].value
            })
                .then(() => {
                    this.setState({
                        editingProd: ''
                    })
                    this.loadData(id)
                })
        }
    }

    handleEditProd = (prod) => {
        this.setState({
            editingProd: prod.id
        })
    }

    cancelRename = () => {
        this.setState({
            editingProd: ''
        })
    }

    renderProd = (prod) => {
        return (
            <div key={prod.id}>
                {this.state.editingProd !== prod.id &&
                    <li className="list-group-item list-group-item-light">{prod.name}
                        <button className="close" type="button btn-sm" onClick={() => this.deleteProd(prod)}><span>&times;</span></button>
                        <button className="close" type="button btn-sm" onClick={() => this.handleEditProd(prod)}><span>edit</span></button>
                    </li>
                }
                {this.state.editingProd === prod.id &&
                    <div>
                        <input onKeyDown={this.renameProd} ref={'prod-' + prod.id} defaultValue={prod.name} />
                        <button onClick={this.cancelRename} className="btn btn-secondary">Cancel</button>
                    </div>
                }
            </div>
        )
    }

    renderCat = (cat) => {
        return <h3 key={cat.id} >{cat.category}</h3>
    }

    render() {
        const categories = this.state.categories
        return (
            <div>
                <small style={{ textAlign: 'center' }} className="text-muted">{categories.map(this.renderCat)}</small>
                <div style={{ marginTop: 10 }} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Products</span>
                    </div>
                    <input onKeyDown={this.insertProd} ref="newProd" placeholder="Insert new Product" type="text" className="form-control" aria-label="New Category" aria-describedby="inputGroup-sizing-default" />
                </div>
                <ul className="list-group list-group-flush">
                    {this.state.products.map(this.renderProd)}
                </ul>
            </div>
        )
    }
}

