import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import indexStyles from '../../css/StoreIndex.module.css'

const StoreIndex = () => {
    const navigate = useNavigate()
    const [combo, setCombo] = useState([])
    const [popcorn, setPopcorn] = useState([])
    const [drink, setDrink] = useState([])
    const [snack, setSnack] = useState([])
    
    combo.length=4
    popcorn.length=3
    drink.length=3
    snack.length=3


    useEffect(()=>{
        axios.get(`https://jjh.herokuapp.com:8080/store/getIndexCombo`)
             .then(res => setCombo(res.data))
             .catch(error => console.log(error))

        axios.get(`https://jjh.herokuapp.com:8080/store/getIndexPopcorn`)
             .then(res => setPopcorn(res.data))
             .catch(error => console.log(error))

        axios.get(`https://jjh.herokuapp.com:8080/store/getIndexDrink`)
             .then(res => setDrink(res.data))
             .catch(error => console.log(error))
        
        axios.get(`https://jjh.herokuapp.com:8080/store/getIndexSnack`)
             .then(res => setSnack(res.data))
             .catch(error => console.log(error))
        
    },[])
    
    return (
        <>
            <div className={indexStyles.category_product_wrap}>
                <ul className={indexStyles.category_product_list}>
                    <li>
                        <strong className={indexStyles.category_product_title}>콤보
                            <a href="/store/combo"  className={indexStyles.btn_category_product} style={{background:'url(/img/plus-circle.svg) left top scroll no-repeat'}}>더보기</a>
                        </strong>
                        <ul className={indexStyles.category_product_inner_list}>
                            {
                                
                                combo.map(item => {
                                    
                                    const goToCart = (e) => {

                                        e.preventDefault()
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
            
                                        axios.get('https://jjh.herokuapp.com:8080/store/isExistCart', {params: {
                                            userName : sessionStorage.getItem("userName"),
                                            store_seq : item.store_seq
                                        }})
                                            .then(res => res.data === 'exist' ? alert('장바구니에 이미 상품이 담겨있습니다.') 
                                            :
                                            axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'cart'
                                            }}
                                        )
                                            .then(() => { if (window.confirm('장바구니에 상품이 등록되었습니다.\n장바구니 페이지로 이동할까요?')){ navigate('/store/cart') }})
                                            
                                            .catch(error => console.log(error))
                                            )
                                            .catch(error => console.log(error))
                                            
                                    }
                                    const goToPay = () => {
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
                                        
                                        axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'pay'
                                            }})
                                            .then(()=>navigate(`/store/pay/${item.store_seq}`))
                                            .catch(error => console.log(error))
                                    }
                                    
                                    return(
                                    <li key={item.store_seq}>
                                        <Link to={`/store/view/${ item.store_seq }`} className={indexStyles.btn_category_product}>
                                    <span className={indexStyles.best_product_img_wrap}>
                                        <img src={`../storage/${ item.img }`} alt={ item.subject }/>
                                    </span>
                                    <span className={indexStyles.best_product_text_wrap}>
                                        <span className={indexStyles.best_product_text_title}>{item.subject}</span>
                                        <span className={indexStyles.best_product_text_name}>{item.content}</span>
                                        <span className={indexStyles.best_product_sale_price_wrap}>
                                            <span className={indexStyles.store_deatail_source_price}>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </span>
                                    </span>
                                </Link>
                                <a href="#" className={indexStyles.btn_category_product_cart} onClick={ goToCart } style={{background:' url(/img/cart.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>1</a>
                                <a href="#" className={indexStyles.btn_category_product_gift} onClick={ ()=> goToPay(item.cart_seq) } style={{background:' url(/img/bag-check.svg) no-repeat center', backgroundSize:'22pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>2</a>
                                <a href="#" className={indexStyles.btn_category_product_buy} onClick={()=> alert('준비중입니다.')} style={{background:' url(/img/gift.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>3</a>
                                    </li>
                                )})
                            }
                        </ul>
                    </li>
                    <li>
                        <strong className={indexStyles.category_product_title}>팝콘
                            <a href="/store/popcorn" className={indexStyles.btn_category_product} style={{background:'url(/img/plus-circle.svg) left top scroll no-repeat'}}>더보기</a>
                        </strong>
                        <ul className={indexStyles.category_product_inner_list}>
                            {
                                popcorn.map(item => {
                                    
                                    const goToCart = (e) => {

                                        e.preventDefault()
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
            
                                        axios.get('https://jjh.herokuapp.com:8080/store/isExistCart', {params: {
                                            userName : sessionStorage.getItem("userName"),
                                            store_seq : item.store_seq
                                        }})
                                            .then(res => res.data === 'exist' ? alert('장바구니에 이미 상품이 담겨있습니다.') 
                                            :
                                            axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'cart'
                                            }}
                                        )
                                            .then(() => { if (window.confirm('장바구니에 상품이 등록되었습니다.\n장바구니 페이지로 이동할까요?')){ navigate('/store/cart') }})
                                            
                                            .catch(error => console.log(error))
                                            )
                                            .catch(error => console.log(error))
                                            
                                    }
                                    const goToPay = () => {
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
                                        
                                        axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'pay'
                                            }})
                                            .then(()=>navigate(`/store/pay/${item.store_seq}`))
                                            .catch(error => console.log(error))
                                    }
                                    
                                    return(
                                    <li key={item.store_seq}>
                                        <Link to={`/store/view/${ item.store_seq }`} className={indexStyles.btn_category_product}>
                                    <span className={indexStyles.best_product_img_wrap}>
                                        <img src={`../storage/${ item.img }`} alt={ item.subject }/>
                                    </span>
                                    <span className={indexStyles.best_product_text_wrap}>
                                        <span className={indexStyles.best_product_text_title}>{item.subject}</span>
                                        <span className={indexStyles.best_product_text_name}>{item.content}</span>
                                        <span className={indexStyles.best_product_sale_price_wrap}>
                                            <span className={indexStyles.store_deatail_source_price}>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </span>
                                    </span>
                                </Link>
                                <a href="#" className={indexStyles.btn_category_product_cart} onClick={ goToCart } style={{background:' url(/img/cart.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>1</a>
                                <a href="#" className={indexStyles.btn_category_product_gift} onClick={ ()=> goToPay(item.cart_seq) } style={{background:' url(/img/bag-check.svg) no-repeat center', backgroundSize:'22pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>2</a>
                                <a href="#" className={indexStyles.btn_category_product_buy} onClick={()=> alert('준비중입니다.')} style={{background:' url(/img/gift.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>3</a>
                                    </li>
                                )})
                            }
                        </ul>
                    </li>
                    <li>
                        <strong className={indexStyles.category_product_title}>음료
                            <a href="/store/drink" className={indexStyles.btn_category_product} style={{background:'url(/img/plus-circle.svg) left top scroll no-repeat'}}>더보기</a>
                        </strong>
                        <ul className={indexStyles.category_product_inner_list}>
                            {
                                drink.map(item => {
                                    
                                    const goToCart = (e) => {

                                        e.preventDefault()
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
            
                                        axios.get('https://jjh.herokuapp.com:8080/store/isExistCart', {params: {
                                            userName : sessionStorage.getItem("userName"),
                                            store_seq : item.store_seq
                                        }})
                                            .then(res => res.data === 'exist' ? alert('장바구니에 이미 상품이 담겨있습니다.') 
                                            :
                                            axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'cart'
                                            }}
                                        )
                                            .then(() => { if (window.confirm('장바구니에 상품이 등록되었습니다.\n장바구니 페이지로 이동할까요?')){ navigate('/store/cart') }})
                                            
                                            .catch(error => console.log(error))
                                            )
                                            .catch(error => console.log(error))
                                            
                                    }
                                    const goToPay = () => {
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
                                        
                                        axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'pay'
                                            }})
                                            .then(()=>navigate(`/store/pay/${item.store_seq}`))
                                            .catch(error => console.log(error))
                                    }
                                    
                                    return(
                                    <li key={item.store_seq}>
                                        <Link to={`/store/view/${ item.store_seq }`} className={indexStyles.btn_category_product}>
                                    <span className={indexStyles.best_product_img_wrap}>
                                        <img src={`../storage/${ item.img }`} alt={ item.subject }/>
                                    </span>
                                    <span className={indexStyles.best_product_text_wrap}>
                                        <span className={indexStyles.best_product_text_title}>{item.subject}</span>
                                        <span className={indexStyles.best_product_text_name}>{item.content}</span>
                                        <span className={indexStyles.best_product_sale_price_wrap}>
                                            <span className={indexStyles.store_deatail_source_price}>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </span>
                                    </span>
                                </Link>
                                <a href="#" className={indexStyles.btn_category_product_cart} onClick={ goToCart } style={{background:' url(/img/cart.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>1</a>
                                <a href="#" className={indexStyles.btn_category_product_gift} onClick={ ()=> goToPay(item.cart_seq) } style={{background:' url(/img/bag-check.svg) no-repeat center', backgroundSize:'22pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>2</a>
                                <a href="#" className={indexStyles.btn_category_product_buy} onClick={()=> alert('준비중입니다.')} style={{background:' url(/img/gift.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>3</a>
                                    </li>
                                )})
                            }
                        </ul>
                    </li>
                    <li>
                        <strong className={indexStyles.category_product_title}>스낵
                            <a href="/store/snack" className={indexStyles.btn_category_product} style={{background:'url(/img/plus-circle.svg) left top scroll no-repeat'}}>더보기</a>
                        </strong>
                        <ul className={indexStyles.category_product_inner_list}>
                            {
                                snack.map(item => {
                                    
                                    const goToCart = (e) => {

                                        e.preventDefault()
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
            
                                        axios.get('https://jjh.herokuapp.com:8080/store/isExistCart', {params: {
                                            userName : sessionStorage.getItem("userName"),
                                            store_seq : item.store_seq
                                        }})
                                            .then(res => res.data === 'exist' ? alert('장바구니에 이미 상품이 담겨있습니다.') 
                                            :
                                            axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'cart'
                                            }}
                                        )
                                            .then(() => { if (window.confirm('장바구니에 상품이 등록되었습니다.\n장바구니 페이지로 이동할까요?')){ navigate('/store/cart') }})
                                            
                                            .catch(error => console.log(error))
                                            )
                                            .catch(error => console.log(error))
                                            
                                    }
                                    const goToPay = () => {
            
                                        sessionStorage.getItem("userName") === null ? 
                                        alert('로그인이 필요합니다.') || navigate('/member/loginForm') :
                                        
                                        axios.post('https://jjh.herokuapp.com:8080/store/insertCart', null, {params: {
                                                count : 1,
                                                img : item.img,
                                                price : item.price,
                                                store_seq : item.store_seq,
                                                subSubject : item.subSubject,
                                                subject : item.subject,
                                                userName : sessionStorage.getItem("userName"),
                                                state : 'pay'
                                            }})
                                            .then(()=>navigate(`/store/pay/${item.store_seq}`))
                                            .catch(error => console.log(error))
                                    }
                                    
                                    return(
                                    <li key={item.store_seq}>
                                        <Link to={`/store/view/${ item.store_seq }`} className={indexStyles.btn_category_product}>
                                    <span className={indexStyles.best_product_img_wrap}>
                                        <img src={`../storage/${ item.img }`} alt={ item.subject }/>
                                    </span>
                                    <span className={indexStyles.best_product_text_wrap}>
                                        <span className={indexStyles.best_product_text_title}>{item.subject}</span>
                                        <span className={indexStyles.best_product_text_name}>{item.content}</span>
                                        <span className={indexStyles.best_product_sale_price_wrap}>
                                            <span className={indexStyles.store_deatail_source_price}>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                        </span>
                                    </span>
                                </Link>
                                <a href="#" className={indexStyles.btn_category_product_cart} onClick={ goToCart } style={{background:' url(/img/cart.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>1</a>
                                <a href="#" className={indexStyles.btn_category_product_gift} onClick={ ()=> goToPay(item.cart_seq) } style={{background:' url(/img/bag-check.svg) no-repeat center', backgroundSize:'22pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>2</a>
                                <a href="#" className={indexStyles.btn_category_product_buy} onClick={()=> alert('준비중입니다.')} style={{background:' url(/img/gift.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>3</a>
                                    </li>
                                )})
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default StoreIndex;