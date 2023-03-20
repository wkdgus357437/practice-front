import React, {useEffect, useState} from 'react';
import reservations from './Reservation.module.css';
import axios from 'axios';
import ReservationModal from '../user/ReservationModal';
import styles from "../css/Success.module.css";
import {useNavigate} from 'react-router-dom';

const Reservation = () => {

    const [id] = useState(sessionStorage.getItem('userName'));
    const [reservationLog, setReservationLog] = useState([])
    const [logArray, setLogArray] = useState([]);
    const [filler, setFiller] = useState([]) //현재 좌석현황
    const [done, setDone] = useState(false)
    const navigate = useNavigate();


    // 예약내역 가져오기.
    useEffect(() => {
        getReservation()
    }, [])

    useEffect(() => {
        !done ? setLogArray(reservationLog.filter(item => item.movie_status === '미상영')) : setLogArray(reservationLog)
    }, [done])

    const [viewReservation, setViewReservation] = useState();

    const getReservation = () => {
        axios.get(`https://jjh.herokuapp.com:8080/reservation/getReservation?id=${id}`)
            .then(res => {
                var array = res.data;
                var copy = [];
                array.map(item => {
                    copy.push({...item, movie_seat: JSON.parse(item.movie_seat)})
                })
                setReservationLog(copy)
                setLogArray(copy.filter(item => item.movie_status === '미상영'))
            })
    }

    //만료되지 않은 정보만
    const reservationCancel = (targetReservation) => {
        window.confirm &&
        axios.get(`https://jjh.herokuapp.com:8080/book/getSeat?pk=${targetReservation.book_pk}`)
            .then(res => {
                //pk로 가져온 상영정보
                var showDTO = res.data;
                //그중 현재좌석정보
                var roomStatus = JSON.parse(showDTO.movie_seat)
                //array for set roomStatus
                var copyRoom = [];
                //target copyArray
                var copy = targetReservation.movie_seat

                roomStatus.map((roomStatusItem) => {
                    var exist = false
                    copy.map(targetItem => {
                        exist = roomStatusItem.id === targetItem.id ? true : exist;
                    })
                    console.log(exist)
                    if (!exist) copyRoom.push(roomStatusItem)
                })
                showDTO = {...showDTO, movie_seat: JSON.stringify(copyRoom)}
                //DB에서 삭제
                axios.post('https://jjh.herokuapp.com:8080/book/addSeat', showDTO, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    axios.delete(`https://jjh.herokuapp.com:8080/reservation/cancelReservation?pk=${targetReservation.pk}`)
                        .then(res => {
                            alert('예매가 취소되었습니다.')
                            getReservation();
                            closeModal();

                        }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))


    }

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const username = sessionStorage.getItem('userName');

    const [paymentData, setPaymentData] = useState([]);

    // 스토어 구매현황
    useEffect(() => {
        axios.get(`https://jjh.herokuapp.com:8080/store/myStorePaymentInfo?username=${username}`)
            .then(res => {
                setPaymentData(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    const [toggle, setToggle] = useState(false)

    const onToggle = () => {
        console.log(toggle)
        setToggle(!toggle)
    }

    const [movieReservationChk, setMovieReservationChk] = useState(true);
    const [storePaymentChk, setStorePaymentChk] = useState(false);


    const [reservationDisplay, setReservationDisplay] = useState("")
    const [storeDisplay, setStoreDisplay] = useState("none")

    useEffect(() => {
        if (movieReservationChk) {
            setReservationDisplay("block");
            setStoreDisplay("none")
            setStorePaymentChk(false);

        } else if (storePaymentChk) {
            setReservationDisplay("none");
            setStoreDisplay("block");
            setMovieReservationChk(false);
        }
    })
    return (
        <>
            <div className={reservations.reservations_first}>
                <div className={`${reservations.containnner} ${reservations.has_lnb}`}>
                    <div className={reservations.inner_wrappo}>
                        <div id="contents" className="hithere" style={{width: '800px'}}>
                            <div className={reservations.tab_cont_wrap}>
                                {/* 예매내역 */}
                                <div id="myBokdArea" className={`${reservations.tab_cont} ${reservations.on}`}>
                                    <a href="" className={reservations.irrr}>
                                        예매 탭 화면 입니다.
                                    </a>

                                </div>


                                {/* 구매내역 영역 */}
                                <div id="myPurcArea" className="tab_cont">
                                    <a href="" className={reservations.irrr}/><br/>
                                    {/* 구매 조회 조건 */}
                                    <div className={`${reservations.board_list_search} ${reservations.mt20}`} style={{marginTop:"35px"}}>
                                        <table className={reservations.tables} summary="구매 조회 조건">
                                            <colgroup>
                                                <col style={{width: 75}}/>
                                                <col/>
                                            </colgroup>
                                            <tbody>
                                            <tr>
                                                <th scope="row">구분</th>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="radPurc"
                                                        id="radPurc02"
                                                        defaultValue="P"
                                                        checked={movieReservationChk}
                                                        onClick={() => {setMovieReservationChk(true)
                                                            setStorePaymentChk(false)}}
                                                    />
                                                    <label htmlFor="radPurc02">&nbsp;&nbsp;예매 내역</label>
                                                    <input
                                                        type="radio"
                                                        name="radPurc"
                                                        id="radPurc03"
                                                        defaultValue="C"
                                                        checked={storePaymentChk}
                                                        onClick={() => {setStorePaymentChk(true)
                                                            setMovieReservationChk(false)}}
                                                    />
                                                    <label htmlFor="radPurc03">&nbsp;&nbsp;스토어 구매내역</label>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* 구매 조회 조건 End */}

                                    <div style={{display: reservationDisplay}}>
                                        {/* 예매현황 */}
                                        <div className={`${reservations.board_list_util} ${reservations.mb10}`}>
                                            <label style={{float: "right", height: "25px"}}><input type='checkbox'
                                                                                                   onClick={() => setDone(!done)}></input><span>&nbsp;지난 예매 내역보기</span><br/><br/></label>
                                        </div>
                                        <div className={reservations.table_wrap}>
                                            <table
                                                className={`${reservations.board_list} ${reservations.tables}`}
                                                summary="결제일시, 구분, 상품명, 결제금액, 상태 항목을 가진 결제내역 목록 표"
                                            >
                                                <caption>

                                                </caption>
                                                <colgroup>
                                                    <col style={{width: 160}}/>
                                                    <col style={{width: 150}}/>
                                                    <col/>
                                                    <col style={{width: 120}}/>
                                                    <col style={{width: 120}}/>
                                                </colgroup>
                                                <thead>
                                                <tr style={{textAlign: "center"}}>
                                                    <th scope="col">상영관</th>
                                                    <th scope="col">영화</th>
                                                    <th scope="col">상영일시</th>
                                                    <th scope="col">인원</th>
                                                    <th scope="col">좌석</th>
                                                    <th scope="col">상태</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    reservationLog.length === 0 ?
                                                        <tr>
                                                            <td colSpan="6" className={reservations.a_c}>예약정보가 없습니다.
                                                            </td>
                                                        </tr>

                                                        :
                                                        logArray.map((item, index) => (

                                                            <tr key={item.pk}
                                                                className={item.movie_status === '미상영' ? styles.notplayed : ''}
                                                                onClick={() => item.movie_status === '미상영' ? (openModal(), setViewReservation(item)) : ''}>
                                                                {/* 상영관 */}
                                                                <td>비트박스{item.movie_cinema} {item.movie_theater}</td>
                                                                {/* 영화 */}
                                                                <td>{item.movie_title}</td>
                                                                {/* 상영일시 */}
                                                                <td>{item.movie_date} / {item.movie_time}</td>
                                                                {/* 인원 */}
                                                                <td style={{width: '200px'}}>
                                                                    {item.movie_seat.filter(item => item.customer === 'adult').length === 0 ? '' : `성인: ${item.movie_seat.filter(item => item.customer === 'adult').length} `}<br />
                                                                    {item.movie_seat.filter(item => item.customer === 'child').length === 0 ? '' : `청소년: ${item.movie_seat.filter(item => item.customer === 'child').length} `}
                                                                </td>
                                                                {/* 좌석 */}
                                                                <td>
                                                                    {
                                                                        item.movie_seat.map((item1, index) => (
                                                                            <span
                                                                                key={item1.id}>{item1.number}{index === item.movie_seat.length - 1 ? '' : ','}</span>
                                                                        ))
                                                                    }
                                                                </td>
                                                                {/* 상영예정 */}
                                                                <td>{item.movie_status}</td>


                                                            </tr>

                                                        ))
                                                }
                                                <ReservationModal open={modalOpen} close={closeModal}
                                                                  header="예약내역"
                                                                  closeBtn="창닫기" viewReservation={viewReservation}
                                                                  reservationCancel={reservationCancel}></ReservationModal>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* 스토어 구매 현황 */}
                                    <div style={{marginTop: "30px"}}>
                                        <div className={reservations.table_wrap} style={{display: storeDisplay}}>
                                            <table
                                                className={`${reservations.board_list} ${reservations.tables}`}
                                                summary="결제일시, 구분, 상품명, 결제금액, 상태 항목을 가진 결제내역 목록 표"
                                            >
                                                <caption>

                                                </caption>
                                                <colgroup>
                                                    <col style={{width: 160}}/>
                                                    <col style={{width: 430}}/>
                                                    <col/>
                                                </colgroup>
                                                <thead>
                                                <tr style={{textAlign: "center"}}>
                                                    <th scope="col">주문번호</th>
                                                    <th scope="col">상품명</th>
                                                    <th scope="col">결제금액</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    paymentData.length === 0 ?
                                                        <tr>
                                                            <td colSpan="3" className={reservations.a_c}>구매내역이 없습니다.
                                                            </td>
                                                        </tr>

                                                        :
                                                        paymentData.map((item, index) => (

                                                            <tr key={item.pay_seq}>
                                                                <td>{item.orderNumber}</td>
                                                                <td>{item.subject}</td>
                                                                <td>{[item.totalPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                                                            </tr>

                                                        ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <nav className={reservations.pagination} id="navPurc"/>
                                    {/* 구매 안내상황  */}
                                    <div className={`${reservations.box_pulldown} ${reservations.mt30}`}>
                                        <div className={reservations.tit}>
                                            <button type="button" className={reservations.btn_toggle}
                                                    onClick={onToggle}>
                                                이용안내
                                                <i className={`${reservations.iconset} ${reservations.ico_arr_toggle_down}`}/>
                                            </button>
                                        </div>

                                        {toggle &&
                                            <div className={reservations.cont}>
                                                <strong>[예매 안내]</strong>
                                                <ul className={reservations.dot_list}>
                                                    <li>
                                                        만 4세(48개월) 이상부터는 영화티켓을 반드시 구매하셔야 입장 가능합니다.
                                                    </li>
                                                    <li>예매 변경은 불가능하며, 취소 후 재 예매를 하셔야만 합니다.</li>
                                                    <li>
                                                        메가박스 모바일앱을 이용할 경우 티켓출력없이 모바일티켓을 통해 바로
                                                        입장하실 수 있습니다.
                                                    </li>
                                                </ul>
                                                <br/>
                                                <strong>[티켓교환 안내]</strong>
                                                <ul className={reservations.dot_list}>
                                                    <li>
                                                        극장의 무인발권기(KIOSK)를 통해 예매번호 또는
                                                        고객확인번호(생년월일+휴대폰번호)를 입력하여 편리하게 티켓을 발권하실 수
                                                        있습니다.
                                                    </li>
                                                    <li>
                                                        무인발권기 이용이 어려우신경우, 티켓교환권을 출력하여 매표소에 방문하시면
                                                        티켓을 발권하실 수 있습니다.
                                                    </li>
                                                    <li>
                                                        (티켓교환권 출력이 어려운경우 예매번호와 신분증을 지참하여 매표소에
                                                        방문하시면 티켓을 발권하실 수 있습니다)
                                                    </li>
                                                </ul>
                                                <br/>
                                                <strong>[예매취소 안내]</strong>
                                                <ul className={reservations.dot_list}>
                                                    <li>온라인(홈페이지/모바일) 예매 취소는 상영시간 20분전까지 입니다.</li>
                                                    <li>
                                                        위탁 예매 사이트 이용 시 취소 및 환불 규정은 해당 사이트 규정을 따릅니다.
                                                    </li>
                                                    <li>
                                                        LIVE 공연 콘텐트는 취소 기준은 아래와 같습니다.
                                                        <ul className={reservations.dot_list}>
                                                            <li>관람 4일전 : 취소 가능</li>
                                                            <li>관람 3일 ~ 1일전 : 취소 수수료 부담 후 취소 가능</li>
                                                            <li>관람 당일 : 취소 및 환불 불가</li>
                                                        </ul>
                                                    </li>
                                                    <li>공연 관람시 시작 시간 이후에는 입장이 제한 됩니다.</li>
                                                    <li>발권된 티켓은 상영시간 전까지 현장 방문 시에만 취소가 가능합니다.</li>
                                                </ul>
                                                <br/>
                                                <strong>[스토어 구매/취소 안내]</strong>
                                                <ul className={`${reservations.dot_list} ${reservations.mb30}`}>
                                                    <li>
                                                        스토어 상품은 구매 후 취소가능기간 내 100% 환불이 가능하며,
                                                        부분환불은 불가 합니다.{" "}
                                                    </li>
                                                    <li>
                                                        (ex. 3개의 쿠폰을 한 번에 구매하신 경우, 3개 모두 취소만 가능하며
                                                        그 중 사용하신 쿠폰이 있는 경우 환불이 불가합니다)
                                                    </li>
                                                    <li>스토어 교환권은 MMS로 최대 1회 재전송 하실 수 있습니다.</li>
                                                </ul>

                                            </div>
                                        }
                                    </div>
                                    {/* 구매 안내상황  End */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reservation;