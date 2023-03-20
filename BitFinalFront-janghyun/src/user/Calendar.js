import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../css/calendar.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ko } from "date-fns/esm/locale";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useNavigate, useParams} from "react-router-dom";
import Hours from "./Hours";
import '../css/hour.css'

import Layout from "../Main/Layout";
import Footer from "../Main/Footer";
import {getCookieToken} from "src/member/storage/Cookie";








const Calendar = () => {
    const {mvName} = useParams();
    const [ScrollActive, setScrollActive] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);

    const navigate = useNavigate();

    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [movieName, setMovieName] = useState(mvName);
    const [cityName, setCityName] = useState('');
    const [cinemaName, setCinemaName] =useState('');
    const [hidden, setHidden] =useState(false);



    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const months = ['01', '02', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const ctime = Date.now()
    const posterDelBtn = () =>{
        setCinemaName('')
        setCityName('')
        setList2([])
        setList3([])
        setList4([])
        setMovieName('')


    }
    const cityNameDelBtn = () =>{
        setCityName('')
        findCity()
    }
    const cinemaNameDelBtn = () =>{
        setCinemaName('')
        findCinema()
    }

    const[ list4, setList4]=useState([])
    const findTime = (e) => {
        setHidden(true)
        const cinemaName = e.target.id
        setCinemaName(cinemaName)
        axios.post(`https://jjh.herokuapp.com:8080/book/timeList?movie_date=${dsd}&movie_title=${movieName}&movie_city=${cityName}&movie_cinema=${cinemaName}`)
            .then(res=>setList4(res.data))
            .catch(error => console.log(error))
    }



    const[ list3, setList3]=useState([])
    const result3 = list3.filter((item1, idx1)=>{
        return list3.findIndex((item2, idx2)=>{
            return item1.movie_cinema === item2.movie_cinema;
        }) === idx1;
    });

    const findCinema = (e) => {
        setCinemaName('')
        setHidden(false)
        const cityName = e.target.id
        setCityName(cityName)
        axios.post(`https://jjh.herokuapp.com:8080/book/cinemaList?movie_date=${dsd}&movie_title=${movieName}&movie_city=${cityName}`)
            .then(res=>setList3(res.data))
            .catch(error => console.log(error))
    }
    const isSeoul =(element) => {
        if(element.movie_city === '서울'){
            return true;
        }
        return false;
    }

    const isGyung = (element) =>  {
        if(element.movie_city === '경기') {
            return true;
        }
        return false;
    }

    const[ list2, setList2]=useState([])

    const result2 = list2.filter((item1, idx1)=>{
        return list2.findIndex((item2, idx2)=>{
            return item1.movie_city === item2.movie_city;
        }) === idx1;
    });

    const result4 = list2.filter((item1, idx1)=>{
        return list2.findIndex((item2, idx2)=>{
            return item1.movie_cinema === item2.movie_cinema;
        }) === idx1;
    });
    const seoul = result4.filter(isSeoul)
    const gyung = result4.filter(isGyung)
    const findCity = (e) => {
        setList3([])
        setCityName('')
        setCinemaName('')
        setHidden(false)
        const movieName = e.target.id
        setMovieName(movieName)
        axios.post(`https://jjh.herokuapp.com:8080/book/cityList?movie_date=${dsd}&movie_title=${movieName}`)
            .then(res=>setList2(res.data))
            .catch(error => console.log(error))
    }





    const offset = selectedDate.getTimezoneOffset()*60000
    const dateOffset = new Date(selectedDate.getTime()-offset)
    const dsd = dateOffset.toISOString().split("T",1)
    const[ list, setList]=useState([])

    const result = list.filter((item1, idx1)=>{
        return list.findIndex((item2, idx2)=>{
            return item1.movie_title === item2.movie_title;
        }) === idx1;
    });

    useEffect(()=>{
        setHidden(false)
        axios.post(`https://jjh.herokuapp.com:8080/book/movieList?movie_date=${dsd}`)
            .then(res=>{

                setList(res.data)
            })
            .catch(error => console.log(error))

    },[selectedDate])

    useEffect(()=>{
        axios.post(`https://jjh.herokuapp.com:8080/book/cityList?movie_date=${dsd}&movie_title=${movieName}`)
            .then(res=>setList2(res.data))
            .catch(error => console.log(error))


    },[setMovieName])

    const renderHeader = () => {
        return (
            <div className="calendar-header">

                <div className="calendar-week">
                    &nbsp;{currentWeek.getFullYear()}.{months[currentWeek.getMonth()]}&nbsp; {/* {currentWeek.getDate()}일 -&nbsp;
                    {new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 9).getFullYear()}년 {months[new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 9).getMonth()]} {new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 9).getDate()}일 */}
                </div>

            </div>
        );
    }

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < 10; i+=1) {
            const day = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + i);
            days.push(
                <button

                    className={`calendar-day ${day.toDateString() === selectedDate?.toDateString() ? 'on' : ''} ${day.getDay() === 6 ? 'blue' : ''} ${day.getDay() === 0 ? 'red' : ''}` }
                    key={day.toDateString()}
                    onClick={() => {
                        setSelectedDate(day)

                    }
                    }

                >
                   {day.getDate()} {daysOfWeek[day.getDay()]}
                </button>
            );
        }



        return<div className="calendar-days"> <button
            className='calendar-day'
            onClick={() =>{
                if(currentWeek> new Date())
                    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - 1))
            }}>
            <span className='left'/>
        </button>

            {days}

            <button
                className='calendar-day'
                onClick={() =>{

                    setCurrentWeek(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 1))
                }}>
                <span className='right'/>
            </button>

        </div>;
    }

    return (
        <>

            <Layout>

        <div className="container22">
            <h2 className='tit2'>빠른예매</h2>
            <div className='dateWrap'>
                {renderHeader()}
                <div className="calendar">
                    {renderDays()}
                    <DatePicker
                        locale={ko}    // 언어설정 기본값은 영어
                        dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
                        className=""    // 클래스 명 지정 css주기 위해
                        minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정
                        closeOnScroll='true'   // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                        selected={selectedDate}
                        onChange={date => {
                            setCurrentWeek(date)
                            setSelectedDate(date)
                        }}
                    />


                </div>
            </div>
            <div className="box-1">
                <p className='tit'>영화</p>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="전체">
                        <div className='titarea'>
                            {
                                result.map(item=> {
                                    return (

                                        <div
                                            key={item.pk}
                                            className={`mt ${item.movie_title === movieName ? 'selName':''}`}
                                        >
                                        <span
                                            className={`gg-${item.movie_age}`}
                                        />&nbsp;
                                            <button
                                                className={`mt ${item.movie_title === movieName ? 'selName':''}`}
                                                id={item.movie_title}
                                                onClick={findCity}
                                            >{item.movie_title}</button></div>

                                    )
                                })
                            }
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>코르사주</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>드라이브마이카</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>견왕:이누오</button></div>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>메모리아</button></div>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>가가린</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>코르사주</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>드라이브마이카</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>견왕:이누오</button></div>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>메모리아</button></div>

                        </div>

                        <div className='posterWrap'>
                            <div className={`mvposter ${movieName==="아바타: 물의 길" ? 'aaa' : movieName==="스위치"? 'bbb' : movieName==="영웅"? 'ccc' :movieName==="젠틀맨"? 'ddd' : movieName==="본즈 앤 올"? 'eee' :movieName==="더 퍼스트 슬램덩크"? 'fff' : movieName==="장화신은 고양이: 끝내주는모험"? 'ggg' : ''}`}>
                                {`${movieName === '' ? '영화를 선택해주세요.' : ''}`}</div>
                            <button
                                className={`posterDel ${movieName === '' ? 'on' : ''}`}
                                onClick={posterDelBtn}
                            >삭제</button>

                        </div>

                    </Tab>
                    <Tab eventKey="profile" title="큐레이션">
                        <div className='titarea'>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>아바타: 물의길</button></div>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>영웅</button></div>
                            <div><span className='gg-All'/>&nbsp;<button className='mt'>러브레터</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>올빼미</button></div>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>스위치</button></div>
                            <div><span className='gg-18'/>&nbsp;<button className='mt'>본즈 앤 올</button></div>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>가가린</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>코르사주</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>드라이브마이카</button></div>
                            <div><span className='gg-15'/>&nbsp;<button className='mt'>견왕:이누오</button></div>
                            <div><span className='gg-12'/>&nbsp;<button className='mt'>메모리아</button></div>
                        </div>
                        <div className='mvposter'>
                            영화를 선택해주세요.</div>

                    </Tab>

                </Tabs>

            </div>
            <div className="box-2">
                <p className='tit'>극장</p>

                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="전체">
                        <div className='cinema-1'>
                            {
                                result2.map(item=> {
                                    return (
                                        <div
                                            className={`mt ${item.movie_city === cityName ? 'selCity':''}`}
                                            key={item.pk}>
                                            <button
                                                className={item.movie_city === cityName ? 'selCity':''}
                                                id={item.movie_city}
                                                onClick={findCinema}
                                            >{item.movie_city}({item.movie_city === '서울'? seoul.length : gyung.length})</button></div>

                                    )
                                })

                            }

                        </div>



                        <div className='cinema-2'>
                            {
                                result3.map(item=> {
                                    return (
                                        <div
                                            className={`mt ${item.movie_cinema === cinemaName ? 'selName':''}`}
                                            key={item.pk}>
                                            &nbsp;
                                            <button
                                                className={`mt ${item.movie_cinema === cinemaName ? 'selName':''}`}
                                                id={item.movie_cinema}
                                                onClick={findTime}
                                            >{item.movie_cinema}</button></div>

                                    )
                                })
                            }
                        </div>
                        <div className='cityWrap'>
                            <div className={`cn1 ${cityName !== '' ? 'on' : ''}`}>{cityName}</div>
                            <button
                                className={`cityDel ${cityName === '' ? 'on' : ''}`}
                                onClick={cityNameDelBtn}
                            />
                        </div>
                        <div className='cinemaWrap'>
                            <div className={`cn2 ${cinemaName !== '' ? 'on' : ''}`}>{cinemaName}</div>
                            <button
                                className={`cinemaDel ${cinemaName === '' ? 'on' : ''}`}
                                onClick={cinemaNameDelBtn}
                            />
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="특별관">
                        <div className='cinema-1'>
                            <div><button>DOLBY CINEMA(5)</button></div>
                            <div><button>THE BOUTIGUE(9)</button></div>
                            <div> <button>MX(9)</button></div>
                        </div>
                        <div className='cinema-2'/>

                    </Tab>

                </Tabs>





            </div>

            <div className="box-3">
                <p className='tit3'>시간</p>
                <Hours />

                <div className='result' hidden={!hidden}>



                    {

                        list4.map(item=> {
                            const timess = item.movie_time.split(':')
                            const dtime = new Date(selectedDate)
                            const etime = dtime.setHours(Number(timess[0]))
                            const gtime = dtime.setMinutes(Number(timess[1]))
                            const ftime = dtime.getTime()
                            if(ftime>ctime){
                                return (
                                    <div key={item.pk} className='tooltip2'>

                                        <button
                                            className="bbtn"
                                            id={timess[0]}
                                            onClick={() => {
                                                if (getCookieToken()) {

                                                    const username = sessionStorage.getItem('birth')

                                                    if(list4[0].movie_age === '18'){
                                                        {Number(username.substring(0,2)) < 6 ? alert( '만19세이상만 관람가능한 영화입니다.') : Number(username.substring(0,2)) > 30 ? navigate(`/user/get/${item.pk}`) : alert( '만19세이상만 관람가능한 영화입니다.')}
                                                        
                                                    }else{
                                                        navigate(`/user/get/${item.pk}`)
                                                    }

                                                }else{
                                                    const popupX = (window.screen.width / 2) - 300;
                                                    const popupY= (window.screen.height / 2) - 300;

                                                    alert('로그인이필요한 서비스 입니다.')
                                                    window.open("/member/loginForm2","","width=600px,height=600px,left="+ popupX + ", top="+ popupY)
                                                }
                                                }}
                                        >
                                            <div className="legend"/>
                                            <span className='time'>
                                            <strong>{item.movie_time} </strong>
                                            <div> ~ {Number(timess[0])+2}:{timess[1]}</div>
                                            </span>
                                            <span className="title">
                                                <strong>{movieName}</strong>
                                                <div>2d(자막)</div>
                                            </span>
                                            <div className="info">
                                                <span className="theater">
                                                     {cinemaName}
                                                    <br/>
                                                    {item.movie_theater}
                                                </span>
                                                <span className="seat">
                                                    <strong className="now">{item.movie_seat.split(',')[0]==='[]'? 50 : 50-item.movie_seat.split(',').length}</strong>
                                                    <span>/</span>
                                                    <em className="all">50</em>
                                                </span>
                                            </div>
                                        </button>
                                        <div className='tooltiptext2'>
                                            <iframe
                                                src={`/user/get2/${item.pk}`}
                                                scrolling='no'
                                                className="preview-box"
                                                title='preview-box'
                                            >
                                                <p>Your browser does not support iframes.</p>
                                            </iframe>
                                        </div>
                                    </div>


                                )}
                            return '';

                        })
                    }




                </div>

                <div className='no-result' hidden={hidden}>
                    <div className='ico-movie-time'/>
                    <br/>
                    <p>영화와 극장을 선택하시면<br/>
                        상영시간표를 비교하여볼수있습니다.</p>
                </div>



            </div>
            <div className={ScrollActive ? "fixedBox fixed" : "fixedBox"}>
                {ScrollActive ?
                    <div className="fixedBtn_wrap">
                        <a href="/user/calendar/1" className="btn_fixedTicketing">예매하기</a>
                        <a href="#none" className="btn_gotoTop">
                            <img src="https://img.cgv.co.kr/R2014/images/common/btn/gotoTop.png" alt="최상단으로 이동"/></a>
                    </div>
                    :
                    <div className="fixedBtn_wrap topBtn">
                        <a href="/user/calendar/1" className="btn_fixedTicketing">예매하기</a>
                        <a href="#" className="btn_gotoTop">
                            <img src="https://img.cgv.co.kr/R2014/images/common/btn/gotoTop.png" alt="최상단으로 이동"/></a>
                    </div>}
            </div>
        </div>
                <Footer/>
            </Layout>



</>

    );
}

export default Calendar;