import React, { useState } from 'react';
import styles from './ItemListFavorite.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { removeFavorite } from '../../redux/slice/UserItemSlice';

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

type Props = {
    item: Item;
    index: number;

};



const ItemListFavorite: React.FC<Props> = ({ item, index }) => {

    const dispatch = useDispatch<any>()

    const removeF = async () => {



        dispatch(removeFavorite(item))


    }
    return (
        <div className={styles.container}>

            <div className={styles.Img}>
                <img src={item.thumbnail} alt="" />
            </div>

            <div className={styles.detail}>
                <p>{item.title}</p>
                <div className={styles.heart}>


                    <AiFillHeart onClick={() => removeF()} />

                </div>

            </div>




        </div>
    );
};

export default ItemListFavorite;