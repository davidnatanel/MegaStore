import React from 'react';
import styles from './Paginate.module.css';


interface PaginateProps {
    pageNumbers: any;
    paginate: any;
    currentPage: any;

}
const Paginate = ({ pageNumbers, paginate, currentPage }: PaginateProps) => {
    return (
        <div className={styles.container}>







            <div className={styles.pagination}>
                {pageNumbers.map((number: number) => (

                    <button key={number} style={currentPage == number ? { color: 'white' } : { color: 'gray' }} className={currentPage == number ? styles.active : ''} onClick={() => paginate(number)}>
                        {number}
                    </button>

                ))}
            </div>




        </div>
    );
};

export default Paginate;