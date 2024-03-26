import React, { useEffect, useReducer } from 'react';
import './screen.css';

const INCREMENT = 'increment';
const DECREMENT = 'decrement';

function quantityReducer(state, action) {
    const { productId } = action;
    switch (action.type) {
        case INCREMENT:
            return { ...state, [productId]: (state[productId] || 0) + 1 };
        case DECREMENT:
            return { ...state, [productId]: Math.max(0, (state[productId] || 0) - 1) };
        default:
            return state;
    }
}

const Screen = () => {
    const Products = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
        { id: 3, name: 'Product 3', price: 300 }
    ];

    const [productQuantities, dispatch] = useReducer(quantityReducer, {});

    // Calculate total price
    const totalPrice = Products.reduce((total, product) => {
        const quantity = productQuantities[product.id] || 0;
        return total + (quantity * product.price);
    }, 0);

    return (
        <div className="main">
            <div className="products">
                <div className="titlediv">
                    <h1 className="title">Products</h1>
                </div>
                {Products.map((product) => {
                    const quantity = productQuantities[product.id] || 0;
                    return (
                        <div className="productdiv" key={product.id}>
                            <p className='prodname'>{product.name}</p>
                            <p className='prodprice'>{product.price}</p>
                            <div className="buttons">
                                <span className='btn' onClick={() => dispatch({ type: DECREMENT, productId: product.id })}>-</span>
                                <p className='qtycount'>{quantity}</p>
                                <span className='btn' onClick={() => dispatch({ type: INCREMENT, productId: product.id })}>+</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="cart">
                <div className="titlediv">
                    <h1 className="title">Cart</h1>
                </div>
                {Products.filter(product => productQuantities[product.id] > 0).map((product) => (
                    <div className="productdiv" key={product.id}>
                        <p>{product.name}</p>
                        <p>{productQuantities[product.id]} * {product.price}</p>
                    </div>
                ))}
                <div className="total">
                <p>Total: {totalPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default Screen;
