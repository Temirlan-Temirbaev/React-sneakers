import './App.scss'
import React from 'react'
import Home from './Home/Home';
import Header from './Components/Header';
import SneakersContext from './Context';
import Order from './Components/Order/Order';
import {Routes, Route} from 'react-router-dom';
import Favorites from './Favorites/Favorites';
import axios from 'axios';

class App extends React.Component {
    state = {
        opened: false,
        products: {},
        isLoading: true,
        order: {},
        favorites: {}
    }
    addToOrder = (key) => {
        let order = {...this.state.order};
        order[key] = order[key] + 1

        this.setState({order})
    }
    deleteFromOrder = key => {
        const order = {...this.state.order};
        delete order[key]
        this.setState({order})
    };
    addToFavorites = (key) => {
        let favorites = {...this.state.favorites};
        favorites[key] = favorites[key] + 1
        this.setState({favorites})
    }
    deleteFromFavorites = (key) => {
        let favorites = {...this.state.favorites}
        delete favorites[key]
        this.setState({favorites})
    }

    componentDidMount() {
        // get products
        let fetchData = async () => {
            this.setState({isLoading: true})
            let productsResp = await axios.get("https://61c05aec33f24c00178232ae.mockapi.io/items")
            let products = {...this.state.products}
            this.setState({isLoading: false})
            products = productsResp.data
            this.setState({products})
        }
        fetchData()

        // save cardProducts and favorites in localstorage
        const localStorageCart = localStorage.getItem('cart')
        if (localStorageCart) this.setState({order: JSON.parse(localStorageCart)})
        const localStorageFavorites = localStorage.getItem('favorites')
        if (localStorageFavorites) this.setState({favorites: JSON.parse(localStorageFavorites)})
    };

    componentDidUpdate() {
        localStorage.setItem('cart', JSON.stringify(this.state.order))
        localStorage.setItem('favorites', JSON.stringify(this.state.favorites))
    };

    render() {
        return <SneakersContext.Provider
            value={{
                favorites: this.state.favorites,
                deleteFromFavorites: this.deleteFromFavorites,
                addToFavorites: this.addToFavorites,
                sneakers: this.state.products,
                order: this.state.order,
                addToCart: this.addToOrder,
                removeFromCart: this.deleteFromOrder
            }}>
            <div className='wrapper clear'>
                {this.state.opened ? <Order
                    sneakers={this.state.products}
                    order={this.state.order}
                    removeFromCart={this.deleteFromOrder}
                    closeCard={() => {
                        let opened = {...this.state.opened}
                        opened = false;
                        this.setState({opened})
                    }}/> : null}
                <Header
                    sneakers={this.state.products}
                    order={this.state.order}
                    onOpenCard={() => {
                        let opened = {...this.state.opened}
                        opened = true;
                        this.setState({opened})
                    }}/>
                <Routes>
                    <Route path="/" element={<Home isLoading={this.state.isLoading}/>}/>
                    <Route path="/favorites"
                           element={<Favorites favorites={this.state.favorites} products={this.state.products}/>}/>
                </Routes>
            </div>
        </SneakersContext.Provider>
    }
}

export default App;