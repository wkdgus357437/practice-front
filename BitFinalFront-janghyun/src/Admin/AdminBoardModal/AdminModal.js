import React from 'react';
import './AdminModalModul.css'


// AdminBoardModalUpdatePage.js .. AdminBoardModalRead.js .. AdminBoardModalPage.js 공용 
const AdminModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section  style={{width:'400px'}}>
          <header style={{textAlign:'center'}}>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main  style={{height:'300px'}}>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};
export default AdminModal;