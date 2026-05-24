import React from 'react'
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

export default function index({index, title, slug, manageModal}: any) {

    return (
        <Link to={`/work/${slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
            <div onMouseEnter={(e: any) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e: any) => {manageModal(false, index, e.clientX, e.clientY)}} className={styles.project}>
                <h2>{title}</h2>
                <p>Design & Development</p>
            </div>
        </Link>
    )
}
