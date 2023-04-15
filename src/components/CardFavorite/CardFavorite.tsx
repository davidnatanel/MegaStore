import React from 'react';
import styles from './CardFavorite.module.css';
import { useDispatch } from 'react-redux';
import { setItem } from '../../redux/slice/ProductsSlice';
import { removeFavorite } from '../../redux/slice/UserItemSlice';

interface CardProps {
    img: string;
    title: string;
    price: number;
    item: any;

}
const CardFavorite = ({ item, img, title, price }: CardProps) => {
    const dispatch = useDispatch<any>()

    const setId = () => {
        dispatch(setItem(item))
    }

    const removeF = async () => {



        dispatch(removeFavorite(item))


    }
    return (
        <div className={styles.container} >
            <span onClick={() => removeF()} className={styles.quitfavorite}>x</span>
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

export default CardFavorite;