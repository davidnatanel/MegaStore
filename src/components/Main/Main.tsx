import React from 'react';
import styles from './Main.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react'
import CardItem from '../CardItem/CardItem';
import Filter from '../Filter/Filter';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setItem } from '../../redux/slice/ProductsSlice';



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




const Main = () => {

    const [itemShop, setItemShop] = useState<Item[]>()

    const count = useSelector((state: RootState) => state.products.products)
    const dispatch = useDispatch<any>()


    useEffect(() => {
        dispatch(fetchProducts());

    }, []);

    useEffect(() => {
        if (count) {
            setItemShop(count)
        }

    }, [count]);


    const setId = (e: Item | undefined) => {


        dispatch(setItem(e))
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>

                <div className={styles.fullrow} >
                    <div className={styles.imgItem}>

                        {itemShop && itemShop.length > 0 && itemShop[0]?.thumbnail ? <img src={itemShop[0]?.thumbnail} alt="" /> : null}
                        <button className={styles.button} onClick={() => setId(itemShop && itemShop[0])}>View More</button>
                    </div>
                    <div className={styles.imgItem}>
                        {itemShop && itemShop.length > 0 && itemShop[1]?.thumbnail ? <img src={itemShop[1]?.thumbnail} alt="" /> : null}
                        <button className={styles.button} onClick={() => setId(itemShop && itemShop[1])}>View More</button>
                    </div>

                </div>
                <div className={styles.halfrow} >

                    <div className={styles.Filter}>
                        <Filter />

                    </div>
                    <div className={styles.Carditem}>

                        <CardItem />

                    </div>
                </div>



            </div>
        </div >
    );
};

export default Main;