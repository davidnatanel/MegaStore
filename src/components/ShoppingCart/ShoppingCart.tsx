import React from 'react';
import styles from './ShoppingCart.module.css';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { changePage } from '../../redux/slice/ProductsSlice';
import { clearCart, clearFavorite } from '../../redux/slice/UserItemSlice';
import ItemList from '../ItemList/ItemList';
import { AiOutlineClose } from 'react-icons/ai';

interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    quantity: any;


}

const ShoppingCart: React.FC<any> = ({ setCloseAndOpen,
    closeAndOpen }) => {
    const itemId = useSelector((state: RootState) => state.useritemslice)

    const dispatch = useDispatch<any>()


    const setModal = () => {

        if (closeAndOpen.cart == true) {

            setCloseAndOpen({ cart: false, favorite: false })

            return

        }


        setCloseAndOpen({ cart: true, favorite: false })
    }

    return (
        <div className={styles.button} >


            <HiOutlineShoppingCart className={`${closeAndOpen.cart ? styles.buttonOpen : null}`} onClick={() => setModal()} />

            <p className={styles.count}>{itemId ? `${itemId.cart.length}` : '0'}</p>



            <div className={`${styles.modal} ${closeAndOpen.cart ? styles.visible : styles.hidden}`}>

                <div className={styles.title}>
                    <h4>Product added to cart</h4>
                </div>

                <div className={styles.list}>
                    {itemId.cart.length <= 0 ? <div className={styles.textList}>

                        <p>
                            cart empty</p>

                    </div>
                        : null}

                    {itemId?.cart.map((e: Item, i: number) => {
                        return (<ItemList index={i} item={e} key={i} />)


                    })

                    }


                </div>
                <div className={styles.buttonView}>

                    <button onClick={() => dispatch(changePage('cart'))}>View To Cart</button>
                    <button onClick={() => dispatch(clearCart())}>Clear Cart</button>


                </div>

            </div>



        </div>
    );
};

export default ShoppingCart;