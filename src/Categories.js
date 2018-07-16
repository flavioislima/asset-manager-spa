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
    }

    loadData(id) {
        axios.get('http://localhost:3001/products?category=' + id)
            .then(result => {
                this.setState({
                    products: result.data
                })
            })

        axios.get('http://localhost:3001/categories?id=' + id)
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
        return <li className="list-group-item list-group-item-light" key={prod.id}>{prod.name}</li>
    }

    renderCat(cat) {
        return <h3 key={cat.id} >{cat.category}</h3>
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

