import React, {useEffect, useState} from 'react';
import joinForm from './JoinForm.module.css';
import Agreement from './Agreement';
import { Route, Routes } from 'react-router-dom';
import InfoMember from './InfoMember';
import FinishJoin from './FinishJoin';

const JoinForm = () => {

    useEffect(() => {
    }, []);
    //상단 페이지 구분바
    const [num, setNum] = useState(2);


    // 화면구성 시작
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
                                <div
                                    className={joinForm.step_member}
                                    title="step1 약관동의, step2 정보입력, step3 가입완료"
                                >
                                    <ol className={joinForm.asdf123123} style={{width:"400px", paddingLeft: 0, marginBottom: 0}}>
                                        <li>
                                            <div className={num === 2 ? joinForm.step : ''}>
                                                <em>STEP1.</em> <span>약관동의{/*약관동의*/}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={num === 3 ? joinForm.step : ''}>
                                                <em>STEP2.</em> <span>정보입력{/*정보입력*/}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={num === 4 ? joinForm.step : ''}>
                                                <em>STEP3.</em> <span>가입완료{/*가입완료*/}</span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>

                                <Routes>
                                    <Route path="/" element={<Agreement setNum={setNum}/>}></Route>
                                    <Route path="/infoMember" element={<InfoMember setNum={setNum}/>}></Route>
                                    <Route path="/finishJoin" element={<FinishJoin setNum={setNum}/>}></Route>
                                </Routes>


                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};


export default JoinForm;