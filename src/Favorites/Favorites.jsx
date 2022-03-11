import React from "react";
import Product from "../Components/Product/Product";
import './Favorites.scss'

class Favorites extends React.Component {
    render() {
        let {favorites, products} = this.props
        let favoriteProducts = Object.keys(favorites).map(key => products[key]).length
        return <div>
            <div className="content">
                <div className="d-flex justify-between align-center">
                    <h1 className="contentTitle">Мои закладки</h1>
                </div>
            </div>
            <div className="sneakers">
                {favoriteProducts === 0 ? <div className="empty">
                        <div>Закладок нет</div>
                    </div> :
                    Object.keys(this.props.favorites).map(key => <Product index={key}
                                                                          key={key} {...this.props.products[key]}/>)}
            </div>
        </div>

    }
}

export default Favorites;
