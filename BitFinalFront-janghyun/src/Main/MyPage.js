import React, {useState} from 'react';
import Header from './Header';
import reservations from './Reservation.module.css';
import Reservation from "src/Main/Reservation";
import EditProfile from "src/Main/EditProfile";


const MyPage = () => {

    const [display, setDisplay] = useState("reservation");

    return (
        <>
            <Header/>

            <div className={reservations.reservations_first}>
                <div className={`${reservations.containnner} ${reservations.has_lnb}`}>
                    <div className={reservations.inner_wrappo}>
                        <div id="contents" className="hithere" style={{width: '800px'}}>
                            <h2 className={reservations.tit}>마이 페이지</h2>
                            <div className={reservations.tab_cont_wrap}>
                                <div>

                                    <ol style={{display: "flex", justifyContent: "center"}}>
                                        <span style={
                                            display === "reservation" ?
                                                {
                                                    width: "50%",
                                                    height: "50px",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    borderLeft: "1px solid red",
                                                    borderTop: "1px solid red",
                                                    borderRight:"1px solid red",
                                                    borderRadius: "10px 10px 0 0",
                                                    color:"red",
                                                    fontWeight:"bold"
                                                }
                                                :
                                                {
                                                    width: "50%",
                                                    height: "50px",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    borderBottom: "1px solid red"
                                                }

                                        }>

                                        <li style={{
                                            listStyle: "none",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                                <span style={{fontSize: "20px", cursor: "pointer"}} onClick={() => {
                                                    setDisplay("reservation")
                                                }}>예매/구매내역</span>
                                        </li>
                                        </span>
                                        <span style={display === "editProFile" ?
                                            {
                                                width: "50%",
                                                height: "50px",
                                                textAlign: "center",
                                                display: "flex",
                                                justifyContent: "center",
                                                borderLeft: "1px solid red",
                                                borderTop: "1px solid red",
                                                borderRight:"1px solid red",
                                                borderRadius: "10px 10px 0 0",
                                                color:"red",
                                                fontWeight:"bold"

                                            }
                                            :
                                            {
                                                width: "50%",
                                                height: "50px",
                                                textAlign: "center",
                                                display: "flex",
                                                justifyContent: "center",
                                                borderBottom: "1px solid red"
                                            }

                                        }>

                                        <li style={{
                                            listStyle: "none",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                                <span style={{fontSize: "20px", cursor: "pointer"}} onClick={() => {
                                                    setDisplay("editProFile")
                                                }}>개인정보 수정</span>
                                        </li>
                                        </span>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                display === "reservation" ? <Reservation/> : <EditProfile/>
            }
        </>
    );
};

export default MyPage;