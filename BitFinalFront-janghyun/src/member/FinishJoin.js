import React, {useEffect, useState} from 'react';
import joinForm from './JoinForm.module.css';
import {useNavigate} from "react-router-dom";

const FinishJoin = ({ setNum }) => {

    const navi = useNavigate();

 //상단 페이지 구분바
 useEffect(()=>{
    setNum(4)
},[]);


    return (
        <>
            <div className={joinForm.join_complete}>
                <i className={`${joinForm.iconset} ${joinForm.ico_join_complete}`} />
                <div className={joinForm.name}>
                비트박스 가입을 환영합니다.{/*님 메가박스 가입을 환영합니다.*/}
                </div>
                <div className={joinForm.txt}>
                이제부터 비트박스에서 제공하는 다양한 멤버십 혜택을 이용하실 수 있습니다.
                {/*이제부터 메가박스에서 제공하는 다양한 멤버십 혜택을 이용하실 수 있습니다.*/}
                </div>
            </div>
            <div className={joinForm.btn_member_bottom}>
                <a
                title="메인 페이지 이동"
                className={`${joinForm.button} ${joinForm.purple} ${joinForm.large}`}
                onClick={() => {
                    navi("/");
                }}
                >
                메인 페이지 이동하기
                </a>
            </div>
        </>
    );
};

export default FinishJoin;