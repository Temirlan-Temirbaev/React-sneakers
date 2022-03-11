import React from 'react'
import {NavLink} from 'react-router-dom'
import './Header.scss'

function Header(props) {
    let {sneakers, order} = props;

    //let TotalPrice = Object.keys(order).map(key => sneakers[key]).reduce((sum, obj) => obj.price + sum, 0);
    function TotalPrice() {
        if (sneakers.length > 0) return Object.keys(order).map(key => sneakers[key]).reduce((sum, obj) => obj.price + sum, 0);
        else return 0
    }

    return <>
        <header className="header d-flex justify-between align-center">
            <NavLink to="/">
                <div className="d-flex align-center">
                    <img src="/img/logo.png" alt="logo" className="mr-15" width={40} height={40}/>
                    <div className="headerInfo">
                        <h3 className="headerTitle">React Sneakers</h3>
                        <p className="headerSubTitle opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </NavLink>
            <ul className='p-10'>
                <li className="firstBtn" onClick={props.onOpenCard}>
                    <img src="/img/basket.svg" className="mr-5" width={18} height={17} alt="basket"/>
                    <span className="basketSum">{TotalPrice()} руб.</span>
                </li>
                <li className="mr-15">
                    <NavLink to="/favorites">
                        <img src="/img/header-like.svg" width={20} height={17} alt="favorites"/>
                    </NavLink>
                </li>
            </ul>
        </header>
    </>

}

export default Header