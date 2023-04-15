import React from 'react';
import styles from './CardItem.module.css';
import Paginate from '../Paginate/Paginate';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchProducts, fetchProductsByQuery } from '../../redux/slice/ProductsSlice';
import Card from '../Card/Card';
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



interface Product {
    products: Item[];
}

const CardItem = () => {
    const products = useSelector((state: RootState) => state.products.productsModific)
    const dispatch = useDispatch<any>()



    const [itemShop, setItemShop] = useState<Item[]>()

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);


    useEffect(() => {
        dispatch(fetchProducts());


        dispatch(fetchProductsByQuery("?limit=10"));

    }, []);

    useEffect(() => {
        if (products) {

            setItemShop(products.slice(indexOfFirstItem, indexOfLastItem))

        }
    }, [products]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        setItemShop(products.slice(indexOfFirstItem, indexOfLastItem))
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }



    return (
        <div className={styles.container}>

            <div className={styles.main}>


                {itemShop?.length == 0 ?
                    <div className={styles.empty}>No Found</div>
                    :
                    itemShop?.map((e, i) => {
                        return (
                            <Card key={i} item={e} img={e.thumbnail} title={e.title} price={e.price} />
                        )


                    })


                }
            </div>

            <Paginate

                pageNumbers={pageNumbers}
                paginate={paginate}
                currentPage={currentPage} />



        </div>
    );
};

export default CardItem;