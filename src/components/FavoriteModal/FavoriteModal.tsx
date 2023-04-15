import React from 'react';
import styles from './FavoriteModal.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { changePage } from '../../redux/slice/ProductsSlice';
import { clearFavorite } from '../../redux/slice/UserItemSlice';
import ItemListFavorite from '../ItemListFavorite/ItemListFavorite';
import { AiOutlineClose } from 'react-icons/ai';

const FavoriteModal: React.FC<any> = ({ setCloseAndOpen,
    closeAndOpen }) => {
    const itemId = useSelector((state: RootState) => state.useritemslice)
    const dispatch = useDispatch<any>()

    const setModal = () => {
        if (closeAndOpen.favorite == true) {

            setCloseAndOpen({ cart: false, favorite: false })


            return

        }


        setCloseAndOpen({ cart: false, favorite: true })
    }

    return (
        <div className={styles.button}>

            <AiOutlineHeart className={`${closeAndOpen.favorite ? styles.buttonOpen : null}`} onClick={() => setModal()} />



            <p className={styles.count}>{itemId ? `${itemId.favorite.length}` : '0'}</p>


            <div className={`${styles.modal} ${closeAndOpen.favorite ? styles.visible : styles.hidden}`}>


                <div className={styles.title}>
                    <h4>Product added to Favorite</h4>

                </div>

                <div className={styles.list}>


                    {itemId.favorite.length <= 0 ? <div className={styles.textList}>
                        <p>


                            favorite empty
                        </p>


                    </div>
                        : null}
                    {itemId?.favorite.map((e, i) => {
                        return (<ItemListFavorite index={i} item={e} key={i} />)


                    })

                    }
                </div>

                <div className={styles.buttonView}>
                    <button onClick={() => dispatch(changePage('favorite'))}>View To Favorite</button>
                    <button onClick={() => dispatch(clearFavorite())}>Clear Favorite</button>

                </div>

            </div>




        </div>
    );
};

export default FavoriteModal;