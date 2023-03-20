import React from 'react';
import styles from '../css/PaymentModal.module.css';
import '../css/modal.css';
import { width } from '@mui/system';



const PaymentModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header,closeBtn, showDTO, selectedSeat, payment, price, discount, movieURL} = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section style={{maxWidth:'800px'}}>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
            <main style={{height:'500px', backgroundImage:'url(/img_member/backgroundRev.png)',background:'cover',backgroundPositionX:'-50px'}}>
            <div className={styles.paymentModal}>
                    <div className={styles.movieImgURL} style={{backgroundImage: `url(${movieURL})`, backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'50%'}}>
                    </div>
                    <div className={styles.reservationInfo}>
                    <div className={styles.movieInfo}>
                            <span className={styles.movieInfoFont} style={{marginBottom:'25px'}}>
                            <img style={{width:'20px',marginBottom:'5px'}} src={
                                showDTO.movie_age==='All'? '/storage/00.png':
                                showDTO.movie_age==='12'? '/storage/12.png':
                                showDTO.movie_age==='15'? '/storage/15.png':
                                '/storage/18.png'
                            }/> {showDTO.movie_title}
                            </span>
                            <span className={styles.movieInfoFont}>비트박스 {showDTO.movie_cinema} {showDTO.movie_theater}</span>
                            <span className={styles.movieInfoFont}>{showDTO.movie_date}</span>
                            <span className={styles.movieInfoFont}>{showDTO.movie_time}</span>
                        </div>
                        <div className={styles.paymentBox}>
                            {
                                selectedSeat.filter(item=>item.customer==='adult').length===0?
                                '':<div className={styles.paymentBoxdiv}>
                                     <span style={{display:'flex',justifyContent:'start',width:'50%', flexWrap:'nowrap'}}>일반 (10000) x{selectedSeat.filter(item=>item.customer==='adult').length}</span>
                                     <span style={{display:'flex',justifyContent:'end',width:'40%'}}> {selectedSeat.filter(item=>item.customer==='adult').length*10000}</span>
                                </div>
                            }
                            {
                                selectedSeat.filter(item=>item.customer==='child').length===0?
                                '':<div className={styles.paymentBoxdiv}> 
                                    <span style={{display:'flex',justifyContent:'start',width:'50%', flexWrap:'nowrap'}}>청소년(5000) x {selectedSeat.filter(item=>item.customer==='child').length}</span>
                                    <span style={{display:'flex',justifyContent:'end',width:'40%'}}> {selectedSeat.filter(item=>item.customer==='child').length*5000}</span>
                                </div>                           
                            }
                            <div className={styles.paymentBoxdiv} style={{borderTop:'2px dotted gray',padding:'5px 0'}}>합계 : {price}원</div>
                        </div>
                        <div className={styles.paymentBox}>
                            {

                            }
                            <div className={styles.paymentBoxdiv} style={{borderTop:'2px dotted gray',padding:'5px 0'}}>할인금액 : {discount}원</div>
                        </div>
                        <div className={styles.payment}>
                            최종 결제 금액 : {price-discount}원
                        </div>
                        <div className={styles.paymentBtn} onClick={payment}>
                            결제
                        </div>
                    </div>
               </div>
            </main>
          <footer>
            <button className="close" onClick={close} style={{backgroundColor:'lightgray',border:'2px solid gainsboro',borderRadius:'5px', fontWeight:'bold'}}>
              {closeBtn}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default PaymentModal;