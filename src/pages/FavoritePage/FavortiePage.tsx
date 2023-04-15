import React from 'react';
import styles from './FavortiePage.module.css';
import { changePage } from '../../redux/slice/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CardFavorite from '../../components/CardFavorite/CardFavorite';

const FavortiePage = () => {
    const state = useSelector((state: RootState) => state.useritemslice)

    const dispatch = useDispatch<any>()

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.page}>

                    <h3>favorite</h3>

                    <button onClick={() => dispatch(changePage(''))}>Back to Home</button>


                </div>


                {state.favorite.length <= 0 ? <div className={styles.empy}>Empty Favorite</div>

                    :

                    <div className={styles.list}>
                        {state.favorite.map((e) => {
                            return (

                                <CardFavorite item={e} img={e.thumbnail} title={e.title} price={e.price} />
                            )
                        })}
                    </div>
                }





            </div>
        </div>
    );
};

export default FavortiePage;