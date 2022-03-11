import axios from 'axios';
import React, {createRef, useState} from 'react';

const Ordering = (props) => {
    let name = createRef()
    let phone = createRef()
    let adress = createRef()
    let [completed, setCompleted] = useState(false)

    function completeOrder() {
        let order = {
            name: name.current.value,
            phone: phone.current.value,
            adress: adress.current.value,
            products: JSON.parse(localStorage.getItem('cart'))
        }
        axios.post('https://61c05aec33f24c00178232ae.mockapi.io/orders', order)
        setCompleted(true)
    }

    function completedWindowRender() {
        return <>
            <div className="items"
                 style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <img width={83} height={120} src='/img/completed.png' alt='completed'/>
                <p className="completedTitle">Заказ оформлен!</p>
                <p className="completedSubTitle">Ваш заказ скоро будет передан<br/> курьерской доставке</p>
            </div>
            <div className="cartTotalBlock">
                <button onClick={props.closeCard}>
                    Готово
                </button>
            </div>
        </>
    }

    return <>
        <h2 className="d-flex justify-between align-center">Оформление заказа
            <img onClick={props.onCloseOrdering} className="removeBtn cu-p" src="/img/deleteCartItem.svg" alt="close"/>
        </h2>
        {completed ? completedWindowRender() : <>
            <div className="items">
                <input ref={adress} type="text" placeholder="Адрес" name='adress'/>
                <input ref={phone} type="tel" placeholder="Номер телефона" name='phone'/>
                <input ref={name} type="text" placeholder="Ф.И.О" name='name'/>
            </div>
            <div className="cartTotalBlock">
                <button onClick={completeOrder}>
                    Завершить
                </button>
            </div>
        </>}
    </>;
};

export default Ordering;
