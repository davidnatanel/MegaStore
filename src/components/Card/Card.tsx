import React from 'react';
import styles from './Card.module.css';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setItem } from '../../redux/slice/ProductsSlice';
import { useState } from 'react'
import { addCart, addFavorite } from '../../redux/slice/UserItemSlice';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';

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
}

interface CardProps {
    img: string;
    title: string;
    price: number;
    item: any;

}
const Card = ({ item, img, title, price }: CardProps) => {
    const [activateAdd, setActivateAdd] = useState(false)
    const dispatch = useDispatch<any>()

    const setId = () => {
        dispatch(setItem(item))
    }

    // const addFavorite: any = (item: any) => {
    //     console.log("i");


    //     return
    // }

    const addF = () => {
        dispatch(addFavorite(item))
        setActivateAdd(!activateAdd)
    }
    const addC = () => {
        dispatch(addCart(item))
        setActivateAdd(!activateAdd)
    }


    return (
        <div className={styles.container} >
            <div className={styles.button} >

                <button className={`${styles.Favorite} ${activateAdd ? styles.visible : styles.hidden}`} onClick={() => addF()} >
                    <AiOutlineHeart />


                </button>
                <button className={`${styles.Cart} ${activateAdd ? styles.visible : styles.hidden}`} onClick={() => addC()} >
                    <HiOutlineShoppingCart />
                </button>


                <button className={styles.add} onClick={() => setActivateAdd(!activateAdd)} >
                    <AiOutlinePlus />
                </button>

            </div>

            <div className={styles.img}>
                <img src={img} alt="" />

            </div>
            <div className={styles.detail}>
                <h4>{title}</h4>
                <p>${price}</p>
            </div>
            <div className={styles.ButtonView}>
                <button onClick={() => { setId() }}>View More</button>

            </div>


        </div>
    );
};

export default Card;

// {activateAdd ?
//     <>
//         <button onClick={() => dispatch(addFavorite(item))} className={`${styles.Favorite}`}>Favorite</button>
//         <button onClick={() => dispatch(addCart(item))} className={`${styles.Cart}`} >Cart</button>
//     </> : null
// }