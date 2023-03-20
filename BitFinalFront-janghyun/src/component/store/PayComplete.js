import React, { useEffect, useState } from 'react';
import StoreHeader from './StoreHeader';
import completeStyles from '../../css/PayComplete.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from 'src/Main/Header.js';

const PayComplete = () => {
    const params = useParams().orderNumber;
    
    const [pay, setPay] = useState({
        pay_seq: '',
        subject: '',
        totalPrice: '',
        orderNumber: '',
        userName: ''
    })
    const { pay_seq, subject, totalPrice, orderNumber, userName } = pay
    const [user, setUser] = useState({
        phoneNumber : ''
    }) 
    const {phoneNumber} = user
    
    useEffect(() => {
        
        axios.get(`https://jjh.herokuapp.com:8080/store/getPay?orderNumber=${params}`)
             .then(res => setPay(res.data))
             .catch(error => console.log(error))
        axios.post(`https://jjh.herokuapp.com:8080/store/getUser?username=${sessionStorage.getItem("userName")}`)
             .then(res => setUser(res.data))
             .catch(error => console.log(error))
             
    }, [])

    const sendKakaoMessage = () => {
        window.Kakao.init('6f0ee5690976138afe26c5c23eec7f36');
        // process.env.REACT_APP_ORDERNUMBER
        // console.log(process.env.REACT_APP_ORDERNUMBER)

        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: 'BITBOX에서 보내요!',
                description: `상품 결제 내역입니다. \n주문번호 : ${params}`,
                imageUrl: 'bitbox',
                link: {
                    webUrl: `https://jjh.herokuapp.com:8080/store/`
                },
            },
            buttons: [
                {
                    title: '주문내역 확인하기',
                    link: {
                        webUrl: `https://jjh.herokuapp.com:8080/store/paycomplete/${params}`
                    },
                },
            ],
        });

        window.location.replace(`/store/paycomplete/${params}`)
    }

    const sendSMSMessage = () => {
        axios.post('https://jjh.herokuapp.com:8080/store/sms', null, {params: {
            recipientPhoneNumber : phoneNumber,
            title : subject,
            content : `BITBOX에서 상품 결제가 완료되었습니다. \n주문번호 : ${orderNumber}`

          }}
          )
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }

    const navigate = useNavigate()
    const gotoMypageReservation = () => {
        navigate('/myPage/reservation')
    }

    const gotoStoreIndex = () => {
        navigate('/store/')
    }

    return (
        <div className={completeStyles.big_payment_complete_wrap}>
            <Header />
            <StoreHeader/>
            <div className={completeStyles.cart_step_wrap}>
                <ul className={completeStyles.cart_step}>
                    <li className={completeStyles.step0}>
                        <img src='../../img/cart3.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 01</span>
                        <strong>장바구니</strong>
                    </li>
                    <li className={completeStyles.step2}>
                        <img src='../../img/wallet3.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 02</span>
                        <strong>결제하기</strong>
                    </li>
                    <li className={completeStyles.active}>
                        <img src='../../img/person.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 03</span>
                        <strong>결제완료</strong>
                    </li>
                </ul>
            </div>


            <div className={completeStyles.payment_complete_wrap}>
                <div className={completeStyles.payment_complete_contents_wrap}>
                    <p>
                        <strong>상품 결제가 완료되었습니다.</strong>
                        <span>{ orderNumber }</span></p>
                    <dl>
                        <dt className={completeStyles.payment_complete_total}>총 결제금액</dt>
                        <dd>
                            <span>{ [totalPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</span></dd>
                    </dl>
                </div>
                <p className={completeStyles.com_box_design_olist}>
                    홈페이지 예매, 어플 예매는 쿠폰 번호 입력 후 이용이 가능하며, 현장 구매 시 상품별 바코드로 결제 가능합니다.</p>
                <p className={completeStyles.com_box_design_olist}>
                    친구에게 선물한 경우 입력하신 수신번호로 상품교환이 가능한 기프트콘이 발송됩니다.</p>
                <div className={completeStyles.com_btn_wrap}>
                    <a href="#none" onClick={ gotoMypageReservation } className={completeStyles.btn_style1} style={{ marginTop: 10, marginBottom: 30}}>결제내역</a>
                    <br />
                    <a href="#" onClick={ gotoStoreIndex } className={completeStyles.btn_style0} style={{ marginBottom: 10}}>상품 더보기</a>
                    <a href="#" onClick={ sendKakaoMessage } className={completeStyles.btn_style0}>카카오톡으로 보내기</a>
                    <a href="#" onClick={ sendSMSMessage } className={completeStyles.btn_style0}>문자로 보내기</a>
                    {/* onClick={ sendSMSMessage } */}
                </div>
            </div>
        </div>
    );
};

export default PayComplete;