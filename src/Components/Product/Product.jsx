import React from 'react';
import {useContext} from 'react';
import SneakersContext from '../../Context';
import ContentLoader from 'react-content-loader';
import './Product.scss'

const Product = ({title, imgUrl, price, id, index, isLoading}) => {
    const contextConsumer = useContext(SneakersContext)

    function check(arr) {
        if (Object.keys(arr).some(key => key === index)) return true;
        else return false
    }

    let isAdded = check(contextConsumer.order)
    let isFavorite = check(contextConsumer.favorites)

    function ButtonHandler() {
        contextConsumer.addToCart(index)
        if (isAdded) contextConsumer.removeFromCart(index)
    }

    function favoriteButtonHandler() {
        contextConsumer.addToFavorites(index)
        if (isFavorite) contextConsumer.deleteFromFavorites(index)
    }

    return <div className="card">
        {isLoading ? <ContentLoader
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
            <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
            <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
            <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
        </ContentLoader> : <>
            <div className="favorite">
                <img
                    onClick={favoriteButtonHandler}
                    src={isFavorite ? '/img/Liked.svg' : 'img/unliked.svg'}
                    alt={isFavorite ? 'Liked' : 'Unliked'}/>
            </div>
            <img width={135} height={135} src={imgUrl} alt={title}/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img onClick={ButtonHandler} className="button" src={isAdded ? '/img/bought.svg' : '/plus.svg'}
                     alt='buy'/>
            </div>
        </>}
    </div>
};

export default Product;
