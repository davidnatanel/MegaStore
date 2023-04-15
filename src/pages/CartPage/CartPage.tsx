import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.css';
import { changePage } from '../../redux/slice/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Card from '../../components/Card/Card';
import ItemList from '../../components/ItemList/ItemList';
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
    quantity: number | any;

}
const CartPage = () => {
    const state = useSelector((state: RootState) => state.useritemslice)
    const dispatch = useDispatch<any>()
    const [value, setvalue] = useState<number>()

    useEffect(() => {
        console.log(state.cart)
        let value = state.cart.map((e: Item) => e.quantity == 0 ? e.price : e.price * e.quantity).reduce((acc, curr) => acc + curr, 0);
        setvalue(value)
    }, [state])

    const buyFun = () => {

        if (state.cart.length == 0) {
            Swal.fire({
                title: 'Empty shopping cart',
                text: 'There are no items in the shopping cart.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                // Action to be executed after the alert is closed
                // You can add any other logic or redirect to another page here
                if (result.isConfirmed) {
                    console.log('Alert closed');
                }
            });





            return
        }
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

                <div className={styles.page}>

                    <h3>Cart</h3>


                    <button onClick={() => dispatch(changePage(''))}>Back to Home</button>


                </div>

                <ul className={styles.detailShop} >
                    <li>Product</li>
                    <li>Unit Price</li>
                    <li>Quantity</li>
                    <li>Total Price</li>
                    <li>action</li>
                </ul>


                {state.cart.length <= 0 ? <div className={styles.empy}>Empty Card</div>

                    : <div className={styles.listCart}>
                        {state.cart.map((e, i) => {
                            return (

                                <ItemList type='cart' index={i} item={e} key={i} />


                            )
                        })}
                    </div>}



                <div className={styles.Buy}>
                    <p> Total Price</p> <p>$ {value}</p>
                    <button onClick={() => buyFun()} className={styles.ButtonView}>Buy Now</button>
                </div>



            </div>
        </div>
    );
};

export default CartPage;