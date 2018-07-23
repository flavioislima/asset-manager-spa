import React, { Component } from 'react'

export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            products: [],
            categories: []
        })
        this.loadData = this.loadData.bind(this)
        this.renderProd = this.renderProd.bind(this)
        this.insertProd = this.insertProd.bind(this)
        this.deleteProd = this.deleteProd.bind(this)
    }

    loadData(id) {
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

    componentDidMount() {
        const id = this.props.match.params.catId
        this.loadData(id)
    }

    componentWillReceiveProps(newProps) {
        const id = newProps.match.params.catId
        this.loadData(id)
    }

    renderProd(prod) {
        return <li className="list-group-item list-group-item-light" key={prod.id}>{prod.name}
            <button className="close" type="button btn-sm" onClick={() => this.deleteProd(prod)}><span>&times;</span></button></li>
    }

    renderCat(cat) {
        return <h3 key={cat.id} >{cat.category}</h3>
    }

    insertProd(event) {
        const id = this.props.match.params.catId

        if (event.keyCode === 13) {
            this.props.insertProduct(this.refs.newProd.value, id)
                .then(() => {
                    this.refs.newProd.value = ''
                    this.loadData(id)
                })
        }
    }

    deleteProd(prod) {
        if (window.confirm(`Do you want to delete ${prod.name}?`)) {
            this.props.deleteProduct(prod)
                .then(async () => {
                    const id = this.props.match.params.catId
                    await this.loadData(id)
                    alert(`Product ${prod.name} deleted!`)
                })
        }
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

