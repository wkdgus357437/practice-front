import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import popcornStyles from '../../css/Popcorn.module.css'

const Drink = () => {
    const [list, setList] = useState([])
    const [category, setCategory] = useState('drink')
    const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://jjh.herokuapp.com:8080/store/getPopcornList?category=${category}`)
         .then(res => setList(res.data))
         .catch(error => console.log(error))
    
    }, [])
    return (
        <>
            <div className={popcornStyles.category_product_list_wrap}>
    
    <strong className={popcornStyles.category_product_list_title}>음료
        <span>탄산음료부터 에이드까지, 마시는 즐거움!</span>
    </strong>
    <ul className={popcornStyles.com_list_style}>

    {
        list.map(item => {
            
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

            return (
                <li key={item.store_seq}>
                    <Link to={`/store/view/${ item.store_seq }`} className={popcornStyles.btn_category_product}>
                        <span className={popcornStyles.com_list_img_wrap}>
                            <img src={`../storage/${ item.img }`} alt={ item.subject }/>
                        </span>
                        <span className={popcornStyles.com_list_text_wrap}>
                            <span className={popcornStyles.com_list_text_title}>{ item.subject }</span>
                            <span className={popcornStyles.com_list_text_name}>{ item.subSubject }</span>
                            <span className={popcornStyles.com_list_sale_price_wrap}>
                                <span className={popcornStyles.store_deatail_source_price}>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                            </span>
                        </span>
                    </Link>
                <a href="#" className={popcornStyles.btn_category_product_cart} onClick={ goToCart } style={{background:' url(/img/cart.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>1</a>
                <a href="#" className={popcornStyles.btn_category_product_gift} onClick={ ()=> goToPay(item.cart_seq) } style={{background:' url(/img/bag-check.svg) no-repeat center', backgroundSize:'22pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>2</a>
                <a href="#" className={popcornStyles.btn_category_product_buy} onClick={()=> alert('준비중입니다.')} style={{background:' url(/img/gift.svg) no-repeat center', backgroundSize:'20pt', backgroundColor:'gray', borderRadius:'50%', opacity:0.9}}>3</a>
                </li>
            )
        })
    }
    </ul>
</div>
        </>
    );
};

export default Drink;