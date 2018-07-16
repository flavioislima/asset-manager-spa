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
    }
    componentDidMount() {
        axios.get('http://localhost:3001/categories')
            .then(result => {
                this.setState({
                    categories: result.data
                })
            })
    }

    renderCat(cat) {
        return <li className="list-group-item" key={cat.id}><Link to={`/products/categories/${cat.id}`}>{cat.category}</Link></li>
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
                </div>
                <div className='col-md-10'>
                    <Route exact path={match.url} component={ProdHome}></Route>
                    <Route exact path={`${match.url}/categories/:catId`} component={Categories}></Route>
                </div>
            </div>
        )
    }
}
