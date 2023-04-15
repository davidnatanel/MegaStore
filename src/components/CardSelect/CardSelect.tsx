import React, { useState } from 'react';
import styles from './CardSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearItem } from '../../redux/slice/ProductsSlice';
import { addCart, addFavorite } from '../../redux/slice/UserItemSlice';
import Swal from 'sweetalert2';


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
const CardSelect = () => {
    const itemId: Item | null = useSelector((state: RootState) => state.products.itemId)

    const [index, setIndex] = useState(0)
    const dispatch = useDispatch<any>()

    const setId = () => {
        dispatch(clearItem(null))
    }
    const buyFun = () => {


        Swal.fire({
            title: 'Purchase completed!',
            text: 'The purchase has been successfully completed.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            // Action to be executed after the alert is closed
            // You can add any other logic or redirect to another page here
            if (result.isConfirmed) {
                console.log('Alert closed');
            }
        });


    }
    return (
        <div className={styles.container}>
            <div className={styles.box}>


                <button className={styles.buttonBack} onClick={() => { setId() }}>Back</button>
                <div className={styles.imgDetail}>

                    {/* <p>{itemId?.thumbnail}</p> */}
                    <div className={styles.index}>
                        <img src={itemId?.images[index]} alt="" />
                    </div>

                    <div className={styles.imgList} >
                        {itemId?.images.map((e, i) => {

                            return (
                                <img className={`${index == i ? styles.indexPoint : null}`} onClick={() => { setIndex(i) }} src={e} alt="" />

                            )
                        })}
                    </div>
                </div>


                <div className={styles.Detail}>


                    <div className={styles.Descrition}>

                        <div className={styles.text}>
                            <h3>{itemId?.title}</h3>
                            <p>{itemId?.description}</p>
                        </div>

                        <div className={styles.detail}>
                            <p>Brand:{itemId?.brand}</p>
                            <p style={{ color: 'white' }}>|</p>
                            <p>Category:{itemId?.category}</p>
                            <p style={{ color: 'white' }}>|</p>
                            <p>Rating:{itemId?.rating}</p>
                        </div>

                        <div className={styles.price}>
                            <p>${itemId?.price}</p>

                        </div>
                    </div>


                    <div className={styles.buttonlist}>
                        <button onClick={() => dispatch(addCart(itemId))} className={styles.buttonAdd} >Add to cart</button>
                        <button onClick={() => dispatch(addFavorite(itemId))} className={styles.buttonAdd} >Add to Favorite</button>
                        <button className={styles.buttonAdd} onClick={() => buyFun()} >Buy Now</button>

                    </div>
                </div>





            </div>
        </div>
    );
};

export default CardSelect;