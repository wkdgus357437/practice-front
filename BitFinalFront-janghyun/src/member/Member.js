import React from 'react';
import {Link} from "react-router-dom";

const Member = () => {
    return (
        <>
            <div>
                <p><Link to="/member/loginForm">로그인</Link></p>
                <p><Link to="/member/joinForm">회원가입</Link></p>
                <p><Link to="/member/memberComponents/AuthPopUpPage">본인인증</Link></p>
            </div>
        </>
    );
};

export default Member;