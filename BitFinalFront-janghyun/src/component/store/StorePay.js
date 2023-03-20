import React, { useEffect, useState } from 'react';
import StoreHeader from './StoreHeader';
import payStyles from '../../css/StorePayment.module.css'
import cartStyles from '../../css/StoreCart.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from 'src/Main/Header.js';

const StorePay = () => {
        const [ list, setList ] = useState([])
        const [ listCount, setListCount ] = useState(0)
        const [ basket, setBasket ] = useState('')
        const [ user, setUser ] = useState({
            userName: '',
            name: '',
            phoneNumber: ''
        })
        const { name, phoneNumber } = user

        const [ form, setForm ] = useState({
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
        const { subject, price, subSubject, count, img, state, cart_seq, store_seq, userName } = form

        const now = new Date()
        const day = now.getFullYear() + '' + ((now.getMonth() + 1) < 10 ? '0'+(now.getMonth() + 1) : (now.getMonth() + 1)) + (now.getDate() < 10 ? '0'+now.getDate() : now.getDate())
    
        
        const [dayAfter, setDayAfter] = useState('')
        const [orderNumber, setOrderNumber] = useState(day + dayAfter)

        const payUpdate = () => {
            let listcartseq = 0;
            let listcount = 0;
            let liststoreseq = 0;
            let listsubject = 0;
            let listsubsubject = 0;
            let listprice = 0;
            let listimg = 0;
            let liststate = day + dayAfter;
    
            for (let i = 0; i < list.length; i++) {
                listcartseq = list[i].cart_seq
                listcount = list[i].count
                liststoreseq = list[i].store_seq
                listsubject = list[i].subject
                listsubsubject = list[i].subSubject
                listprice = list[i].price
                listimg = list[i].img
                liststate = day + dayAfter
    
                axios.post('https://jjh.herokuapp.com/store/updateCart', null, {params: {
                                    cart_seq : listcartseq,
                                    count : listcount,
                                    store_seq : liststoreseq,
                                    subject : listsubject,
                                    subSubject : listsubsubject,
                                    price : listprice,
                                    userName : sessionStorage.getItem("userName"),
                                    img : listimg,
                                    state : day + dayAfter
    
                                  }}
                                  )
                     .then()
                     .catch(error => console.log(error))
                    }
                    alert('결제가 완료되었습니다.')
                    navigate(`/store/paycomplete/${day+dayAfter}`)
    
        }

        useEffect(() => {
            axios.get(`https://jjh.herokuapp.com/store/getCartList?userName=${sessionStorage.getItem("userName")}`)
                    .then(res => {setList(res.data) 
                    || 
                    setDayAfter(res.data[0].cart_seq < 10 ? '00000' + res.data[0].cart_seq : res.data[0].cart_seq < 100 ? '0000' + res.data[0].cart_seq : res.data[0].cart_seq < 1000 ? '000' + res.data[0].cart_seq : res.data[0].cart_seq < 10000 ? '00' + res.data[0].cart_seq : res.data[0].cart_seq < 100000 ? '0' + res.data[0].cart_seq : res.data[0].cart_seq)
                    ||
                    setBasket(res.data.length === 1 ? res.data[0].subject : `${res.data[0].subject} 그 외 ${res.data.length - 1}개`)})
                    .catch(error => console.log(error))
        }, [])

        useEffect(() => {
            axios.post(`https://jjh.herokuapp.com/store/getUser?username=${sessionStorage.getItem("userName")}`)
                 .then(res => setUser(res.data))
                 .catch(error => console.log(error))
                }, [])

        const getTotalPrice = list => {
            let sum = 0;
            for (let i = 0; i < list.length; i++) {
                sum += list[i].count * list[i].price;
            }
            return sum;
            };

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
                    name: basket,
                    amount: getTotalPrice(list),
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
    
                        axios.post('https://jjh.herokuapp.com/store/insertPay', null, {params: {
                            userName: sessionStorage.getItem("userName"),
                            orderNumber: day + dayAfter,
                            subject: basket,
                            totalPrice: getTotalPrice(list)
                        }}
                        )
                            .then(
                                payUpdate()
                                    // axios.post('http://localhost:8080/store/updateCart', null, {params: {
                                    //         subject: subject,
                                    //         price: price,
                                    //         subSubject: subSubject,
                                    //         count: count,
                                    //         img: img,
                                    //         state: day + dayAfter,
                                    //         cart_seq: cart_seq,
                                    //         store_seq: store_seq,
                                    //         userName: sessionStorage.getItem("userName")
                                    //     }}
                                    // )
                                        // .then(alert('결제가 완료되었습니다.') || navigate(`/store/paycomplete/${day+dayAfter}`))
                                        // .catch(error => console.log(error))
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



    return (
        <div>
            <Header />
            <StoreHeader/>

            <div className={payStyles.cart_step_wrap}>
            {/* step_unit3 */}
                <ul className={payStyles.cart_step}>
                    <li className={payStyles.step0}>
                        <img src='../img/cart3.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 01</span>
                        <strong>장바구니</strong>
                    </li>
                    {/* active */}
                    <li className={payStyles.active}>
                        <img src='../img/wallet2.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
                        <span>STEP 02</span>
                        <strong>결제하기</strong>
                    </li>
                    <li className={payStyles.step3}>
                    <img src='../img/person2.svg' style={{display:'inline-block',position:'absolute',top:'45%', left:0, width:'38px',height:'38px', marginTop:'-14px'}}/>
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

                    {
                        list.map((item, index) => {
                            return (
                                <li key={ index }>
                                    <div className={payStyles.product_info_img}>
                                        <img src={`../storage/${ item.img }`} alt={ item.subject }/>
                                        <strong className={payStyles.product_info_name}>{ item.subject }</strong>
                                        <span className={payStyles.product_info_origin}>{ item.subSubject }</span>
                                    </div>
                                    <div className={payStyles.product_info_wrap}>
                                        <span className={payStyles.product_info_one_price}>{[item.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                    </div>
                                    <div className={payStyles.product_info_cnt_wrap}>{ item.count }개</div>
                                    <span className={payStyles.product_info_price}>{[item.price * item.count].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                </li>
                            )
                        })
                    }
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
                                <strong className={payStyles.cart_total_price}>{ getTotalPrice(list).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</strong>
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
                        <input type="text" value={ name } readOnly />
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
                            <img src="../../img/kg_inicis.jpg" alt="KG이니시스" style={{ border: '1px solid gray', borderRadius: 5, marginTop: '-5px', marginLeft: '-40px', width: 90, height: 40, boxShadow: '3px 3px 3px gray' }}/>
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

export default StorePay;