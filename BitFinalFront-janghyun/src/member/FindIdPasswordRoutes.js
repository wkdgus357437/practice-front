import React, {useEffect, useState} from 'react';
import joinForm from './JoinForm.module.css';
import {Route, Routes, useNavigate, Link} from 'react-router-dom';
import FindId from "src/member/FindId";
import FindPassword from "src/member/FindPassword";

const FindIdPasswordRoutes = () => {

    const navi = useNavigate();

    useEffect(() => {

    }, []);

    //상단 페이지 구분바
    const [num, setNum] = useState(2);


    return (
        <div>
            <div className={joinForm.bg_member}>
                <div className={joinForm.body_wrap}>
                    <div className={joinForm.member_wrap}>
                        <h1 className={joinForm.ci}>
                            <a href="/" title="메인 페이지로 이동" style={{backgroundSize: 150}}>
                                BITBOX : Life Theater
                            </a>
                        </h1>
                        <div className={joinForm.col_wrap}>
                            <div className={joinForm.col}>
                                <div style={{width: "300px"}}
                                     className={joinForm.step_member}
                                     title="아이디찾기, 비밀번호찾기"
                                >
                                    <ol style={{paddingLeft: 0, marginBottom: 0}}>
                                        <li style={{listStyle: "none"}}>
                                            <div className={num === 2 ? joinForm.step : ''}>
                                                <span style={{fontSize: "20px", cursor: "pointer"}} onClick={() => {
                                                    setNum(2)
                                                }}>아이디 찾기</span>
                                            </div>
                                        </li>
                                        <li style={{listStyle: "none", float: "right"}}>
                                            <div className={num === 3 ? joinForm.step : ''}>
                                                <span style={{fontSize: "20px", cursor: "pointer"}} onClick={() => {
                                                    setNum(3)
                                                }}>비밀번호 찾기</span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>

                                {
                                    num === 2 ? <FindId/> : <FindPassword/>
                                }

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
};

export default FindIdPasswordRoutes;