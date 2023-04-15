import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.container}>
            <p style={{ fontSize: '0.8em' }}>
                PRIVACY POLICY | TERM OF SERVICE | ABOUT MegaStore

            </p>
            <p style={{ fontSize: '0.8em' }}>
                2022 MegaStore. All Rights reserved

            </p>

        </div>
    );
};

export default Footer;