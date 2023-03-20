import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyPage from './Mypage';

const Index = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };
    return (
        <div>
            <div>
            <h3>***메인 화면***</h3>
            <hr></hr>
            <p><Link to='/store/writeForm'>글쓰기</Link></p>
            <p><Link to='/store'>리스트</Link></p>
            <p><Link to='/store/loginForm'>로그인</Link></p>
            <p><Link to='/store/writeForm2'>글쓰기2</Link></p>
            <button onClick={showModal}>모달 띄우기</button>
            {modalOpen && <MyPage setModalOpen={setModalOpen} />}

        </div>
        </div>
    );
};

export default Index;