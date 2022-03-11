import React from "react";
import './Order.scss'
import SneakersContext from "../../Context";
import Ordering from "./Ordering";

class Order extends React.Component {
    static contextType = SneakersContext
    renderOrder = (key) => {
        const sneaker = this.props.sneakers[key]

        return <div key={key} className="cardItem d-flex align-center mb-20">
            <div className="cartItemImg" style={{backgroundImage: `url(${sneaker.imgUrl})`}}></div>
            <div className="mr-20 flex">
                <p className="mb-5">{sneaker.title}</p>
                <b>{sneaker.price} руб.</b>
            </div>
            <img onClick={() => this.context.removeFromCart(key)} className="removeBtn" src="/img/deleteCartItem.svg"
                 alt="remove"/>
        </div>
    }
    state = {
        renderDrawer: false
    }

    /* <h2 className="d-flex justify-between align-center">Корзина
                <img onClick={this.props.closeCard} className="removeBtn cu-p" src="/img/deleteCartItem.svg" alt="close"/>
            </h2>
            {products === 0 ? <>
            <div className="items emptyBasket">
                    <img src="/img/emptyBasket.jpg" alt="Cart is empty" width={120} height={120}/>
                    <p className="emptyBasketTitle">Корзина пустая</p>
                    <p className='emptyBasketSubTitle'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                </div>
                <div className='cartTotalBlock'>
                    <button  onClick={this.props.closeCard}>
                        Вернуться назад
                    </button>
                </div></> : 
                <>
                <div className="items">
            {Object.keys(order).map(this.renderOrder)}
                </div>
                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>{parseInt(TotalPrice + (TotalPrice / 100 * 5))} руб.</b>                                        
                        </li>
                        <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>{parseInt(TotalPrice / 100 * 5)} руб.</b>                
                        </li>
                        <button>
                            Оформить заказ
                        </button>
                    </ul></div>
            </>}*/
    render() {
        let {sneakers, order} = this.props
        let products = Object.keys(order).map(key => sneakers[key]).length
        let TotalPrice = Object.keys(order).map(key => sneakers[key]).reduce((sum, obj) => obj.price + sum, 0)
        let renderOrders = () => {
            return <><h2 className="d-flex justify-between align-center">Корзина
                <img onClick={this.props.closeCard} className="removeBtn cu-p" src="/img/deleteCartItem.svg"
                     alt="close"/>
            </h2>
                {products === 0 ? <>
                        <div className="items emptyBasket">
                            <img src="/img/emptyBasket.jpg" alt="Cart is empty" width={120} height={120}/>
                            <p className="emptyBasketTitle">Корзина пустая</p>
                            <p className='emptyBasketSubTitle'>Добавьте хотя бы одну пару кроссовок, чтобы сделать
                                заказ.</p>
                        </div>
                        <div className='cartTotalBlock'>
                            <button onClick={this.props.closeCard}>
                                Вернуться назад
                            </button>
                        </div>
                    </> :
                    <>
                        <div className="items">
                            {Object.keys(order).map(this.renderOrder)}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{parseInt(TotalPrice + (TotalPrice / 100 * 5))} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{parseInt(TotalPrice / 100 * 5)} руб.</b>
                                </li>
                                <button onClick={() => this.setState({renderDrawer: true})}>
                                    Оформить заказ
                                </button>
                            </ul>
                        </div>
                    </>}</>
        }
        let renderDrawer = () => {
            return this.state.renderDrawer ? <Ordering closeCard={this.props.closeCard}
                                                       onCloseOrdering={() => this.setState({renderDrawer: false})}/> : renderOrders()
        }
        return <div className="overlay">
            <div className="drawer">
                {renderDrawer()}
            </div>
        </div>
    }
}

export default Order;