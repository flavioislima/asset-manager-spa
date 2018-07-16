import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdHome from './ProdHome'
import Categories from './Categories'

export default class Products extends Component {
    render() {
        const { match } = this.props
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categories:</h3>
                    <Link to='/products/categories/1'>Category 1 </Link>
                </div>
                <div className='col-md-10'>
                    <Route exact path={match.url} component={ProdHome}></Route>
                    <Route exact path={`${match.url}/categories/:catId`} component={Categories}></Route>
                </div>
            </div>
        )
    }
}
