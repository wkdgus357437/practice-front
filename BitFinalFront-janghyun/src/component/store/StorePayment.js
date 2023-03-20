import React, { useEffect, useState } from 'react';
import StoreHeader from './StoreHeader';
import payStyles from '../../css/StorePayment.module.css'
import cartStyles from '../../css/StoreCart.module.css'
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Header from 'src/Main/Header.js';

const StorePayment = () => {
    const now = new Date()
    const day = now.getFullYear() + '' + ((now.getMonth() + 1) < 10 ? '0'+(now.getMonth() + 1) : (now.getMonth() + 1)) + (now.getDate() < 10 ? '0'+now.getDate() : now.getDate())
   
    
    const [dayAfter, setDayAfter] = useState('')
    const [orderNumber, setOrderNumber] = useState(day + dayAfter)

    const [ user, setUser ] = useState({
        userName: '',
        name: '',
        phoneNumber: ''
    })
    const { name, phoneNumber } = user

    const navigate = useNavigate()
    const payment = () => {
        const { IMP } = window;
        IMP.init('imp16543357')
        // IMP.request_pay(param, callback) 결제창 호출  

        IMP.request_pay(
            {
                // param
                pg: 'html5_inicis',
                pay_method: 'card',
                merchant_uid: day + dayAfter,
                name: subject,
                amount: price * count,
                buyer_email: '',
                buyer_name: name,
                buyer_tel: [phoneNumber].toString().replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
                buyer_addr: '',
                buyer_postcode: '',
            },
            res => {
                // callback
                if (res.success) {
                    // 결제 성공 시 로직,

                    axios.post('https://jjh.herokuapp.com:8080/store/insertPay', null, {params: {
                        userName: sessionStorage.getItem("userName"),
                        orderNumber: day + dayAfter,
                        subject: subject,
                        totalPrice: price * count
                    }}
                    )
                        .then(
                                axios.post('https://jjh.herokuapp.com:8080/store/updateCart', null, {params: {
                                        subject: subject,
                                        price: price,
                                        subSubject: subSubject,
                                        count: count,
                                        img: img,
                                        state: day + dayAfter,
                                        cart_seq: cart_seq,
                                        store_seq: store_seq,
                                        userName: sessionStorage.getItem("userName")
                                    }}
                                )
                                    .then(alert('결제가 완료되었습니다.') || navigate(`/store/paycomplete/${day+dayAfter}`))
                                    .catch(error => console.log(error))
                            )
                        .catch(error => console.log(error))
                    //(업데이트 => state를 orderNumber로 바꾸고 나머지는 그대로)
                    
                } else {
                    // 결제 실패 시 로직,
                    alert('결제에 실패하였습니다.');
                }
            },
        );
    };

    const [endPrice, setEndPrice] = useState('')
    const params = useParams().store_seq;
    const [store_seq, setStore_seq] = useState(params)

    const [one, setOne] = useState({
        subject: '',
        price: '',
        subSubject: '',
        count: '',
        img: '',
        state: '',
        cart_seq: '',
        store_seq: '',
        userName: ''
    })
    const { subject, price, subSubject, count, img, cart_seq } = one

    
    useEffect(() => {
        axios.get(`https://jjh.herokuapp.com:8080/store/getOne?userName=${sessionStorage.getItem("userName")}&store_seq=${store_seq}`)
             .then(res => {setOne(res.data)
             || 
            
             //(업데이트 => state를 moon으로 바꾸고 나머지는 그대로)
             axios.post('https://jjh.herokuapp.com:8080/store/updateCart', null, {params: {
                    subject: res.data.subject,
                    price: res.data.price,
                    subSubject: res.data.subSubject,
                    count: res.data.count,
                    img: res.data.img,
                    state: 'moon',
                    cart_seq: res.data.cart_seq,
                    store_seq: res.data.store_seq,
                    userName: sessionStorage.getItem("userName")
                }}
             )
                  .then()
                  .catch(error => console.log(error))

            setDayAfter(res.data.cart_seq < 10 ? '00000' + res.data.cart_seq : res.data.cart_seq < 100 ? '0000' + res.data.cart_seq : res.data.cart_seq < 1000 ? '000' + res.data.cart_seq : res.data.cart_seq < 10000 ? '00' + res.data.cart_seq : res.data.cart_seq < 100000 ? '0' + res.data.cart_seq : res.data.cart_seq)
             })
             
             
             .catch(error => console.log(error))
             
            }, [])
            
            
    useEffect(() => {
        setEndPrice(count*price)
    }, [count])

    useEffect(() => {
            axios.post(`https://jjh.herokuapp.com:8080/store/getUser?username=${sessionStorage.getItem("userName")}`)
                 .then(res => setUser(res.data))
                 .catch(error => console.log(error))
                }, [])

    return (
        <div>
            <Header />
            <StoreHeader/>
            <div className={payStyles.cart_step_wrap}>
            {/* step_unit3 */}
                <ul className={payStyles.cart_step}>
                    <li className={payStyles.step0}>
                        <img src='../../img/cart3.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 01</span>
                        <strong>장바구니</strong>
                    </li>
                    {/* active */}
                    <li className={payStyles.active}>
                        <img src='../../img/wallet2.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 02</span>
                        <strong>결제하기</strong>
                    </li>
                    <li className={payStyles.step3}>
                        <img src='../../img/person2.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 03</span>
                        <strong>결제완료</strong>
                    </li>
                </ul>
            </div>



            <div className={payStyles.com_cart_list_wrap}>
                <strong className={payStyles.com_box_design_title}>구매상품 정보</strong>
                <p className={payStyles.cart_allchecker_wrap}>
                    <strong className={payStyles.com_custom_checkbox_product_name}>상품명</strong>
                    <strong className={payStyles.com_custom_checkbox_sel_price}>판매금액</strong>
                    <strong className={payStyles.com_custom_checkbox_cnt}>수량</strong>
                    <strong className={payStyles.com_custom_checkbox_price}>구매금액</strong>
                </p>
                
                <ul className={payStyles.com_list_style1}>
                    <li>
                        <div className={payStyles.product_info_img}>
                        <img src={`../../storage/${ img }`} alt={ subject }/>
                            <strong className={payStyles.product_info_name}>{ subject }</strong>
                            <span className={payStyles.product_info_origin}>{ subSubject }</span>
                        </div>
                        <div className={payStyles.product_info_wrap}>
                            <span className={payStyles.product_info_one_price}>{[price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                        </div>
                        <div className={payStyles.product_info_cnt_wrap}>{ count }개</div>
                        <span className={payStyles.product_info_price}>{[price * count].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                    </li>
                </ul>

                <table className={payStyles.com_cart_total_price_wrap}>
                    <thead>
                        <tr>
                            <th>
                                총 결제 예정금액
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong className={payStyles.cart_total_price}>{ [endPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>     




            <div className={payStyles.com_box_design_wrap}>
                <strong className={payStyles.com_box_design_title}>주문자 정보 확인</strong>
                <ul className={payStyles.com_box_design}>
                    <li>
                        <label>이름</label>
                        <input type="text" value={ name } readOnly style={{width:'128px'}}/>
                        <label>휴대전화 번호</label>
                        <input type="tel" value={[phoneNumber].toString().replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')} readOnly style={{width:'228px'}}/>
                    </li>
                </ul>
                <p className={payStyles.com_box_design_olist}>
                    구매하신 CGV 기프트콘은 주문자 정보에 입력된 휴대전화 번호로 MMS로 발송됩니다.<br/>
                    입력된 휴대전화 번호가 맞는지 꼭 확인하세요.</p>
            </div>




            <div className={payStyles.com_box_design_wrap}>
                <strong className={payStyles.com_box_design_title}>결제 수단</strong>
                <ul className={payStyles.com_box_design}>
                    
                    <li>
                        {/* <input type="radio" name="radio" className={payStyles.com_custom_radio} id="payment_kakaopay"/> */}
                        <input type="radio" defaultChecked/>
                        <label>
                            <img src="../../img/kg_inicis.jpg" alt="KG이니시스" style={{ border: '1px solid gray', borderRadius: 5, marginTop: '15px', marginLeft: '-40px', width: 90, height: 40, boxShadow: '3px 3px 3px gray' }}/>
                        </label>
                    </li>
                </ul>
                
                <p className={payStyles.com_box_design_olist} id="pKKO">
                    카카오페이는 신용카드 선할인과 카드사 포인트는 이용하실 수 없으며 신용카드별 청구 할인은 이용하실 수 있습니다.</p>
                
                <div className={cartStyles.com_btn_wrap }> {/* cartStyles.pT60 */}
                    {/* <a href="#none" className={cartStyles.btn_style0 } onClick="javascript:fn_Buy(this, 'gift', '');">선물하기</a> */}
                    <a onClick={ payment } className={cartStyles.btn_style0 } style={{ marginTop: 25, marginBottom: 20, cursor: 'pointer', textDecoration: 'none', borderRadius: '4px' }} >결제하기</a> {/* onClick="javascript:fn_Buy(this, 'purchase', '');" */}
                </div>
            </div>

        </div>
    );
};

export default StorePayment;