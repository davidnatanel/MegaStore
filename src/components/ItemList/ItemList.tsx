import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import styles from './ItemList.module.css';
import { useDispatch } from 'react-redux';
import { addCount, removeCart, restCount } from '../../redux/slice/UserItemSlice';

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
    type?: string;
};




const ItemList: React.FC<Props> = ({ item, index, type }) => {
    const [count, setCount] = useState(0)
    const dispatch = useDispatch<any>()


    useEffect(() => {

        setCount(item.quantity)

    }, [item])

    const plusCount = () => {
        dispatch(addCount(index))
    }
    const minusCount = () => {
        dispatch(restCount(index))
    }



    const removeF = () => {

        setTimeout(() => {
            dispatch(removeCart(item))

        }, 100);

    }
    if (type == "cart") {
        return (

            <div className={styles.cardCart}>

                <div className={styles.imgTitle}>
                    <div>
                        <img src={item.thumbnail} alt="" />

                    </div>

                    <p>{item.title}</p>
                </div>
                <div className={styles.unityprice}>${item.price}</div>

                <div className={styles.quantity}>

                    <div className={styles.countCart}>
                        <button onClick={() => { plusCount() }} className={styles.green}>
                            <span>+</span>
                        </button>

                        <input value={count} type="text" name="" id="" />

                        <button onClick={() => { minusCount() }} className={styles.red}>
                            <span>-</span>

                        </button>
                    </div>
                </div>


                <div className={styles.totalprice}>${item.quantity * item.price}</div>
                <div className={styles.action}>
                    <FaTrashAlt onClick={() => removeF()} />

                </div>
            </div>
        )

    }
    return (
        <div className={styles.container}>
            <div className={styles.Img}>
                <img src={item.thumbnail} alt="" />
            </div>

            <div className={styles.detail}>
                <div className={styles.title}>
                    <div className={styles.tex}>
                        <div>
                            <p>{item.title}</p>

                        </div>
                        <div>
                            <p>${item.price}</p>

                        </div>
                    </div>

                    <FaTrashAlt onClick={() => removeF()} />

                </div>

                <div className={styles.count}>
                    <button onClick={() => { plusCount() }} className={styles.green}>
                        <span>+</span>
                    </button>

                    <input value={count} type="text" name="" id="" />

                    <button onClick={() => { minusCount() }} className={styles.red}>
                        <span>-</span>

                    </button>
                </div>

            </div>
        </div>
    );
};

export default ItemList;