import React, { useEffect, useState } from 'react';
import styles from '../../css/List.module.css';
import { BrowserRouter, Router, Link, Route, Routes, useNavigate } from "react-router-dom";
import Index from './Index';
import Popcorn from './Popcorn';
import Drink from './Drink';
import Snack from './Snack';
import Combo from './Combo';
import StoreHeader from './StoreHeader';
import topButtonStyles from '../../css/TopButton.module.css';
import axios from 'axios';
import Header from 'src/Main/Header.js';

const List = () => {
    const [showButton, setShowButton] = useState(false);
    const [combo, setCombo] = useState(false)
    const [popcorn, setPopcorn] = useState(false)
    const [drink, setDrink] = useState(false)
    const [snack, setSnack] = useState(false)

    const scrollToTop = (e) => {
        e.preventDefault()
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        setCombo(false)
        setPopcorn(false)
        setDrink(false)
        setSnack(false)

        axios.get(`https://jjh.herokuapp.com/store/getCartList?userName=${sessionStorage.getItem("userName")}`)
         .then(res => setCount(res.data.length))
         .catch(error => console.log(error))


        const ShowButtonClick = () => {
            if (window.scrollY > 250) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }
        window.addEventListener("scroll", ShowButtonClick)
        
        return () => {
            window.removeEventListener("scroll", ShowButtonClick)
        }
    }, [])
    const navigate = useNavigate()
    const gotoIndex = () => {
        setCombo(false)
        setPopcorn(false)
        setDrink(false)
        setSnack(false)
        navigate('/store/')   
    }
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
    const [count, setCount] = useState(0)

    const gotoCart = () => {
        navigate('/store/cart')
    }

    return (
        <div className={styles.bigger_banner_wrap}>
            <Header />
            <div className={styles.big_banner_wrap}>
                <div className={styles.bx_wrapper}>
                    <div className="bx-viewport" style={{width: '100%', overflow: 'hidden', position: 'relative', height: '400px'}}>
                        <ul className="bxslider" style={{width: 'auto', position: 'relative'}}>
                            <li style={{float: 'none', listStyle: 'none' , position: 'absolute', width: '980px', display: 'block'}}>
                                <a onClick={ gotoIndex } style={{cursor:'pointer'}}>
                                    <img src="../img/store2.jpeg" alt="기프트샵" style={{width:'980px',height:'400px', margin:'auto'}}/> 
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="swiper-button-prev"></div>
            </div>




            <div className={styles.category_wrap}>
                <div className={styles.category_contents_wrap}>
                    <ul className={styles.category_content} style={{listStyle: 'none'}}>
                        <li id="cm4" name="categorymenu" className={combo  ? styles.active : ""}>
                            <a onClick={ gotoCombo } style={{cursor:'pointer'}}>콤보</a>
                            |
                        </li>
                        <li id="cm5" name="categorymenu" className={popcorn  ? styles.active : ""}>
                            <a  href="#" onClick={ gotoPopcorn }>팝콘</a>
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
            


            <Routes>
                <Route path="/" element={<Index />}></Route>
                <Route path="/combo" element={<Combo />}></Route>
                <Route path="/popcorn" element={<Popcorn />}></Route>
                <Route path="/drink" element={<Drink />}></Route>
                <Route path="/snack" element={<Snack />}></Route>
            </Routes>

            {showButton &&
                <div className={topButtonStyles.fixedBtn_wrap }> {/* topButtonStyles.topBtn */}
                    <a href="/ticket/" className={topButtonStyles.btn_fixedTicketing}>예매하기</a>
                    <a href="#" onClick={ scrollToTop } className={topButtonStyles.btn_gotoTop} style={{background:' url(/img/arrow-up.svg) no-repeat center', backgroundSize:'20pt'}}></a>
                </div>
            }
            
        </div>
    );
};

export default List;