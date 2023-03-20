import React,{ useState, useEffect } from 'react'
import Layout from './Layout';
import SlideBox from './SlideBox';
import './Main.css';
import Footer from "./Footer";


const Main = () => {

    const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
    const [ScrollActive, setScrollActive] = useState(false);
    function handleScroll() {
        if (ScrollY > 200) {
            setScrollY(window.pageYOffset);
            setScrollActive(false);
        } else {
            setScrollY(window.pageYOffset);
            setScrollActive(true);
        }
        }
        useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", handleScroll);
        } //  window 에서 스크롤을 감시 시작
        scrollListener(); // window 에서 스크롤을 감시
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }; //  window 에서 스크롤을 감시를 종료
    });
    const [mutedVideo, setMutedVideo] = useState(true);
    const video = document.getElementById('video'); 
    
    return (
        <div className='asdf1234'>
        <Layout>

            <main>
                <article>
                    <div className="movie-wrap">
                        <video id="video" src="https://adimg.cgv.co.kr/images/202212/PussinBoots/1080x608.mp4" autoPlay muted={mutedVideo}>
                            <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions"/>
                        </video>

                        <div className="movieSelection_video_controller_wrap">
                            <a href="http://ad.cgv.co.kr/click/CGV/CGV_201401/main@MovieSelection2021?ads_id%3d47137%26creative_id%3d66867%26click_id%3d87230%26maid%3D%26event%3d" id="ctl00_PlaceHolderContent_AD_CLIP_DETAIL_URL" className="btn_movieSelection_detailView">상세보기</a>
                            <a href="#none" id="pause" className="btn_movieSelection_pause" onClick={() => video.pause()}>Pause</a>
                            <a href="#none" id="play" className="btn_movieSelection_play" onClick={() => video.play()}>Play</a>
                            {mutedVideo === true?
                            <a href="#none" id="mute" className="btn_movieSelection_soundOn" onClick={() => setMutedVideo(false)}>Sound On</a>:
                            <a href="#none" id="mute" className="btn_movieSelection_soundOff" onClick={() => setMutedVideo(true)}>Sound Off</a>}
                            <input name="ctl00$PlaceHolderContent$AD_CNT_URL" type="hidden" id="ctl00_PlaceHolderContent_AD_CNT_URL" value="http://ad.cgv.co.kr/NetInsight/imp/CGV/CGV_201401/main@MovieSelection2021?ads_id%3d47137%26creative_id%3d66867"/>
                        </div>
                    </div>
                    
                    <div className="container55">
                        <header>
                            <div className="tabBtn_wrap">
                                <h3><a href="#none" className="active" id="btnMovie">무비차트</a></h3>
                                <h3><a href="#none" id="btnReserMovie">상영예정작</a></h3>
                            </div>
                            <a>전체보기</a>
                        </header>
                        
                        <SlideBox />
                    </div>
                </article>

                <div className="container55">
                
                <div className="event_title_wrap">
                    <h3>EVENT</h3>
                    <a href="/culture-event/event/defaultNew.aspx" id="btn_allView_Event" className="btn_allView">전체보기</a>
                    <a href="#none" className="btn_eventControl active">playStop</a>
                </div>
                
                
                    <div className="event_list_wrap">
                        <div className="article-contents">
                            <img src="https://img.cgv.co.kr/WebApp/contents/eventV4/36039/16710664376680.jpg" alt={""} width="300px"/>
                            <strong>[아바타: 물의 길]필름마크</strong>
                            <span>2022.12.16~2023.01.08</span>
                        </div>
                        <div className="article-contents">
                            <img src="https://img.cgv.co.kr/WebApp/contents/eventV4/36040/16710665279180.jpg" alt={""} width="300px"/>
                            <strong>[영웅]필름마크</strong>
                            <span>2022.12.16~2023.01.08</span>
                        </div>
                        <div className="article-contents">
                            <img src="https://img.cgv.co.kr/WebApp/contents/eventV4/35945/16698866520870.jpg" alt={""} width="300px"/>
                            <strong>BITBOX VIP PLAY</strong>
                            <span>2022.12.16~2023.02.08</span>
                        </div>
                        
                    </div>
                    </div>

                    <div className="specialHall_wrap">
                        <div className="contents">
                            <div className="specialHall_title_wrap">
                                <h3>특별관</h3>
                                <a href="http://www.cgv.co.kr/theaters/special/defaultNew.aspx" id="btn_allView_Special" className="btn_allView">전체보기</a>
                            </div>

                            <div className="specialHall_content">
                                <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=8" id="ctl00_PlaceHolderContent_specialHall_link" className="specialHall_link">
                                    <div className="img_wrap" data-scale="false">
                                        <img src="https://img.cgv.co.kr//Front/Main/2021/1130/16382612660560.png" id="ctl00_PlaceHolderContent_specialHall_img" alt="CINE de CHEF"/>

                                    </div>
                                </a>
                                
                                <ul className="specialHall_list">
                                    
                                    <li className="">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=7">
                                            <strong>SUITE CINEMA</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#호텔 컨셉의 프리미엄관</span>
                                            </div>
                                        </a>
                                    </li>
                                    
                                    <li className="">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=14">
                                            <strong>CINE &amp; LIVINGROOM</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#신개념 소셜 상영관</span>
                                            </div>
                                        </a>
                                    </li>
                                    
                                    <li className="">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=2">
                                            <strong>4DX</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#모션시트 #오감체험</span>
                                            </div>
                                        </a>
                                    </li>
                                    
                                    <li className="active">
                                        <a href="http://www.cgv.co.kr/theaters/special/defaultDetailNew.aspx?idx=8">
                                            <strong>CINE de CHEF</strong>
                                            <div className="specialHall_hashTag_wrap">
                                                <span className="specialHall_hashTag">#쉐프가 있는 영화관</span>
                                            </div>
                                        </a>
                                    </li>                                   
                                </ul>                               
                            </div>
                            {/* <img src={"./img/CGV.png"} alt="cgv" id="cgv"/> */}
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
            </main>
            <Footer/>

        </Layout>
        </div>
    );
};

export default Main;
