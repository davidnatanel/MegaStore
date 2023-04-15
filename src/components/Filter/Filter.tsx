import React from 'react';
import styles from './Filter.module.css';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchProductsByQuery, filterBrand, filterCategorieAction, filterPriceAction } from '../../redux/slice/ProductsSlice';
import { TfiReload } from 'react-icons/tfi';
let listCate = [

    "smartphones"
    , "laptops"
    , "fragrances"
    , "skincare"
    , "groceries"
    , "home-decoration"
    , "furniture"
    , "tops"
    , "womens-dresses"
    , "womens-shoes"
    , "mens-shirts"
    , "mens-shoes"
    , "mens-watches"
    , "womens-watches"
    , "womens-bags"
    , "womens-jewellery"
    , "sunglasses"
    , "automotive"
    , "motorcycle"
    , "lighting"
]
let listBrand = [
    "Apple"
    , "Samsung"
    , "OPPO"
    , "Huawei"
    , "Microsoft Surface"
    , "Infinix"
    , "HP Pavilion"
    , "Impression of Acqua Di Gio"
    , "Royal_Mirage"
    , "Fog Scent Xpressio"
    , "Al Munakh"
    , "Lord - Al-Rehab"
    , "L'Oreal Paris"
    , "Hemani Tea"
    , "Dermive"
    , "ROREC White Rice"
    , "Fair & Clear"
    , "Saaf & Khaas"
    , "Bake Parlor Big"
    , "Baking Food Items"
    , "fauji"
    , "Dry Rose"
    , "Boho Decor"
    , "Flying Wooden"
    , "LED Lights"
    , "luxury palace"
    , "Golden"
    , "Furniture Bed Set"
    , "Ratttan Outdoor"
    , "Kitchen Shelf"
    , "Multi Purpose"
    , "AmnaMart"
    , "Professional Wear"
    , "Soft Cotton"
    , "Top Sweater"
    , "RED MICKY MOUSE.."
    , "Digital Printed"
    , "Ghazi Fabric"
    , "IELGY"
    , "IELGY fashion"
    , "Synthetic Leather"
    , "Sandals Flip Flops"
    , "Maasai Sandals"
    , "Arrivals Genuine"
    , "Vintage Apparel"
    , "FREE FIRE"
    , "The Warehouse"
    , "Sneakers"
    , "Rubber"
    , "Naviforce"
    , "SKMEI 9117"
    , "Strap Skeleton"
    , "Stainless"
    , "Eastern Watches"
    , "Luxury Digital"
    , "Watch Pearls"
    , "Bracelet"
    , "LouisWill"
    , "Copenhagen Luxe"
    , "Steal Frame"
    , "Darojay"
    , "Fashion Jewellery"
    , "Cuff Butterfly"
    , "Designer Sun Glasses"
    , "mastar watch"
    , "Car Aux"
    , "W1209 DC12V"
    , "TC Reusable"
    , "Neon LED Light"
    , "METRO 70cc Motorcycle - MR70"
    , "BRAVE BULL"
    , "shock absorber"
    , "JIEPOLLY"
    , "Xiangle"
    , "lightingbrilliance"
    , "Ifei Home"
    , "DADAWU"
    , "YIOSI"
]



const Filter = () => {
    const dispatch = useDispatch<any>()

    const [price, setPrice] = useState({
        max: '',
        min: '',
    })
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    useEffect(() => {
        dispatch(filterPriceAction({ max: price.max, min: price.min }))

    }, [price])


    const [hiddenOption, setHiddenOption] = useState<any>(
        {
            Categories: true,
            Brand: true,
            Price: true
        }
    )
    const HiddenOptions = (option: string): void => {

        setHiddenOption({ ...hiddenOption, [option]: !hiddenOption[option] })

        return
    }




    const searchBrands = (brand: string) => {
        // dispatch(fetchProductsByQuery(`?brand=${brand}`));


        dispatch(filterBrand(brand))
    }


    const filtrePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value.replace(/\D/g, '');

        if (valor !== '') {
            setPrice({ ...price, [e.target.name]: valor });
        } else {
            setPrice({ ...price, [e.target.name]: '' });
        }



    }

    const searchCategory = (category: string) => {

        dispatch(fetchProductsByQuery(`/category/${category}`));
    }

    const checkboxCategorie = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.checked == false) {
            dispatch(fetchProducts());
            setSelectedValue('')

            return
        }


        searchCategory(e.target.name)
        setSelectedValue(e.target.name)
        console.log(e.target.checked)
    }


    const checkboxBrand = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log(e.target.name)
        if (e.target.checked == false) {
            dispatch(fetchProducts());
            setSelectedBrand('')

            return
        }



        setSelectedBrand(e.target.name)
        dispatch(filterBrand(e.target.name))


    }
    return (
        <div className={styles.container}>
            <h2 className={styles.title} >Filter <TfiReload onClick={() => dispatch(fetchProducts())} /></h2>
            <button className={styles.button} onClick={() => HiddenOptions('Categories')}>Categories {hiddenOption.Categories ? '+' : '-'}</button>

            <ul className={styles.Categories} style={hiddenOption.Categories ? { 'display': 'none' } : { 'display': '' }} >


                {listCate.map((e) => {
                    return (

                        <li> <p>{e}</p> <input checked={selectedValue == e} name={e} onChange={(e) => checkboxCategorie(e)} type="checkbox" /></li>


                    )
                })}



            </ul>

            <button className={styles.button} onClick={() => HiddenOptions('Brand')}>Brand {hiddenOption.Brand ? '+' : '-'}</button>
            <ul style={hiddenOption.Brand ? { 'display': 'none' } : { 'display': '' }}>
                {listBrand.map((e) => {
                    return (

                        <li><p>{e}</p><input checked={selectedBrand == e} name={e} onChange={(i) => checkboxBrand(i)} type="checkbox" /></li>

                    )
                })}

            </ul>
            <button className={styles.button} onClick={() => HiddenOptions('Price')}>Price {hiddenOption.Price ? '+' : '-'}</button>
            <ul style={hiddenOption.Price ? { 'display': 'none' } : { 'display': '' }}>
                <div className={styles.rangeint}>
                    <div>
                        <input max={price.max} maxLength={6} min={0} value={price.min} name='min' onChange={(e) => filtrePrice(e)} placeholder='Min' />
                        {price.min == '' ? null : <p>$</p>}
                    </div>

                    <div>
                        <input maxLength={6} min={price.min} value={price.max} name='max' onChange={(e) => filtrePrice(e)} placeholder='Max' />
                        {price.min == '' ? null : <p>$</p>}

                    </div>


                </div>


            </ul>

        </div>
    );
};

export default Filter;