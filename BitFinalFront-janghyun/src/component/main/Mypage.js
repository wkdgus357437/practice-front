
import React from 'react';
import styles from '../../css/Modal.module.css'

const MyPage = ({ setModalOpen }) => {
     // 모달 끄기 
     const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={closeModal}>
                X
            </button>
            <p>모달창입니다.</p>
        </div>
    );
};

export default MyPage;