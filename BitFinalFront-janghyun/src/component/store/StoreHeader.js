import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/List.module.css'

const StoreHeader = () => {
    const [count, setCount] = useState(0)
    const [combo, setCombo] = useState(false)
    const [popcorn, setPopcorn] = useState(false)
    const [drink, setDrink] = useState(false)
    const [snack, setSnack] = useState(false)
    useEffect(() => {
        axios.get(`https://jjh.herokuapp.com:8080/store/getCartList?userName=${sessionStorage.getItem("userName")}`)
         .then(res => setCount(res.data.length))
         .catch(error => console.log(error))
    }, [])
    const navigate = useNavigate()
    const gotoCombo = () => {
        setCombo(true)
        setPopcorn(false)
        setDrink(false)
        setSnack(false)
        navigate('/store/combo')
    }
    const gotoPopcorn = () => {
        setCombo(false)
        setPopcorn(true)
        setDrink(false)
        setSnack(false)
        navigate('/store/popcorn')
    }
    const gotoDrink = () => {
        setCombo(false)
        setPopcorn(false)
        setDrink(true)
        setSnack(false)
        navigate('/store/drink')
    }
    const gotoSnack = () => {
        setCombo(false)
        setPopcorn(false)
        setDrink(false)
        setSnack(true)
        navigate('/store/snack')
    }

    const gotoCart = () => {
        navigate('/store/cart')
    }

    return (
        <>
            <div className={styles.category_wrap}>
                <div className={styles.category_contents_wrap}>
                    <ul className={styles.category_content} style={{listStyle: 'none'}}>
                        <li id="cm4" name="categorymenu" className={combo  ? styles.active : ""}>
                            <a onClick={ gotoCombo } style={{cursor:'pointer'}}>콤보</a>
                            |
                        </li>
                        <li id="cm5" name="categorymenu" className={popcorn  ? styles.active : ""}>
                            <a onClick={ gotoPopcorn } style={{cursor:'pointer'}}>팝콘</a>
                            |
                        </li>
                        <li id="cm6" name="categorymenu" className={drink  ? styles.active : ""}>
                            <a onClick={ gotoDrink } style={{cursor:'pointer'}}>음료</a>
                            |
                        </li>
                        <li id="cm7" name="categorymenu" className={snack  ? styles.active : ""}>
                            <a onClick={ gotoSnack } style={{cursor:'pointer'}}>스낵</a>
                        </li>
                    </ul>
                    <ul className={styles.cart_content} style={{listStyle: 'none'}}>
                        <li>
                            <a href="#" onClick={ gotoCart }>장바구니</a>
                            <span id="cartviewcnt">{ count }</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default StoreHeader;