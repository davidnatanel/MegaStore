import React, { MutableRefObject, useEffect, useRef } from 'react';
import styles from './NavBar.module.css';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import { useState } from 'react'
import { changePage, fetchProducts, fetchProductsByQuery } from '../../redux/slice/ProductsSlice';
import { useDispatch } from 'react-redux';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import FavoriteModal from '../FavoriteModal/FavoriteModal';

const NavBar = () => {
    const dispatch = useDispatch<any>()
    const headerRef: MutableRefObject<HTMLDivElement | null | any> = useRef(null)

    const [optionSearch, setOptionSearch] = useState(false)
    const [navDis, setNavDis] = useState(false)
    const [inputSearch, setInputSearch] = useState({
        search: ""
    })

    const [closeAndOpen, setCloseAndOpen] = useState({
        cart: false,
        favorite: false
    })

    const changeInput = (e: any) => {

        setInputSearch({ ...inputSearch, [e.target.name]: e.target.value })


    }

    const searchCategory = (e: any) => {



        if (e.keyCode === 13) {
            dispatch(fetchProductsByQuery(`/search?q=${inputSearch.search}`));

        }

    }


    useEffect(() => {


        window.addEventListener("scroll", function () {


            if (window.scrollY > 10) {
                // headerRef.current.className = [`${styles.Container} ${styles.abajo}`]
                // console.log("si")
                setNavDis(true)
            }
            if (window.scrollY == 0) {
                // headerRef.current.className = [`${styles.Container} `]
                // console.log("no")
                setNavDis(false)


            }

        })


    }, [])


    if (navDis) {
        return (

            <div className={styles.abajo}>

                <div className={styles.abajodown}>
                    <FavoriteModal setCloseAndOpen={setCloseAndOpen} closeAndOpen={closeAndOpen} />
                    <ShoppingCart setCloseAndOpen={setCloseAndOpen} closeAndOpen={closeAndOpen} />


                </div>

            </div>
        )
    }
    return (
        <nav ref={headerRef} className={styles.Container} >
            <div className={styles.Title}>



                {optionSearch ? <input placeholder='Search...' onKeyDown={searchCategory} name='search' onChange={(e) => changeInput(e)} className={styles.input} type="text" /> : <h2 onClick={() => dispatch(changePage(''))}>MegaStore</h2>}

            </div>

            <div className={styles.Options}>
                <div className={styles.button} onClick={() => setOptionSearch(!optionSearch)}> {optionSearch ? <AiOutlineClose className={styles.buttonOpen} /> : <AiOutlineSearch />}</div>



                <FavoriteModal setCloseAndOpen={setCloseAndOpen} closeAndOpen={closeAndOpen} />
                <ShoppingCart setCloseAndOpen={setCloseAndOpen} closeAndOpen={closeAndOpen} />


            </div>


        </nav>
    );
};

export default NavBar;