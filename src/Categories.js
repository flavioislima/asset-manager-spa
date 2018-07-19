import React, { Component } from 'react'
import axios from 'axios'

export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            products: [],
            categories: []
        })
        this.loadData = this.loadData.bind(this)
        this.renderProd = this.renderProd.bind(this)
        this.deleteProd = this.deleteProd.bind(this)
    }

    url = 'http://localhost:3001/'

    loadData(id) {
        axios.get(`${this.url}products?category=${id}`)
            .then(result => {
                this.setState({
                    products: result.data
                })
            })

        axios.get(`${this.url}categories?id=${id}`)
            .then(res => {
                this.setState({ categories: res.data })
            })
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
            <button className="close" type="button btn-sm" onClick={() => this.deleteProd(prod)}><span>x</span></button></li>
    }

    renderCat(cat) {
        return <h3 key={cat.id} >{cat.category}</h3>
    }

    deleteProd(prod) {
        if (window.confirm(`Do you want to delete ${prod.name}?`)) {
            console.log(prod.id)
            axios.delete(`${this.url}products/${prod.id}`)
                .then(() => {
                    alert(`Product ${prod.name} deleted!`)
                    const id = this.props.match.params.catId
                    this.loadData(id)
                })
        }
    }

    render() {
        return (
            <div>
                <small style={{ textAlign: 'center' }} className="text-muted">{this.state.categories.map(this.renderCat)}</small>
                <ul className="list-group list-group-flush">
                    {this.state.products.map(this.renderProd)}
                </ul>
            </div>
        )
    }
}

