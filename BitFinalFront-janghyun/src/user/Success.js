import axios from 'axios';
import ReservationModal from './ReservationModal.js';
import React, {useEffect, useState} from 'react';
import styles from "../css/Success.module.css";

const Success = () => {

    const id = sessionStorage.getItem('userName');
    const [reservationLog,setReservationLog] = useState([])
    const [logArray,setLogArray]=useState([]);
    const [filler,setFiller]=useState([]) //현재 좌석현황
    const [done,setDone]=useState(false)
    // 예약내역 가져오기.
    useEffect(()=>{
        getReservation()
    },[id])
    useEffect(()=>{
        setLogArray(reservationLog)
    },[reservationLog])

    useEffect(()=>{
        done? setLogArray(reservationLog.filter(item=>item.movie_status==='미상영')):setLogArray(reservationLog)
    },[done])

    const [viewReservation,setViewReservation]=useState();

    const getReservation=()=>{
        axios.get(`https://jjh.herokuapp.com/reservation/getReservation?id=${id}`)
        .then(res=>{
            var array = res.data;
            var copy=[];
            array.map(item=>{
                copy.push({...item,movie_seat: JSON.parse(item.movie_seat)})
            })
            setReservationLog(copy)
        })
    }
    //만료되지 않은 정보만
    const reservationCancel=(targetReservation)=>{
        window.confirm &&
        axios.get(`https://jjh.herokuapp.com/book/getSeat?pk=${targetReservation.book_pk}`)
        .then(res=>{
            //pk로 가져온 상영정보
            var showDTO = res.data; 
            //그중 현재좌석정보
            var roomStatus=JSON.parse(showDTO.movie_seat)
            //array for set roomStatus
            var copyRoom = [];
            //target copyArray
            var copy = targetReservation.movie_seat

            roomStatus.map((roomStatusItem)=>{
                var exist=false
                copy.map(targetItem=>{
                    exist = roomStatusItem.id===targetItem.id? true:exist;
                })
                console.log(exist)
                if(!exist) copyRoom.push(roomStatusItem)
            })
            showDTO ={...showDTO,movie_seat:JSON.stringify(copyRoom)}
            //DB에서 삭제
            axios.post('https://jjh.herokuapp.com/book/addSeat',showDTO,{
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                axios.delete(`https://jjh.herokuapp.com/reservation/cancelReservation?pk=${targetReservation.pk}`)
                .then(res=> {
                    alert('예매가 취소되었습니다.')

                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
        
    }

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
     };
    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <>
          대충 마이페이지<br/>
          {/* <input type="text" value={id} onChange={(e)=>setId(e.target.value)}/> */}
          <br/><br/>
            {
              reservationLog.length===0? 
                        <span><br/><br/><br/>예약내역 없음</span>
                   
            :

            <>
            <label><input type='checkbox' onClick={()=>setDone(!done)} ></input><span>만료된 예약 제외</span><br/><br/></label>
            <table className={styles.reservationTable}>
                <tr className='tableTr'>
                    <td>영화</td>
                    <td>상영관</td>
                    <td>상영일시</td>
                    <td>인원</td>
                    <td>좌석</td>
                    <td>상영예정</td>
                </tr>
            {
            logArray.map((item,index)=>(
                
              <tr key={item.pk} className={item.movie_status==='미상영'?styles.notplayed:''} onClick={()=>item.movie_status==='미상영'?( openModal(), setViewReservation(item)):''}>
                    {/* 영화 */}
                    <td>{item.movie_title}</td>
                    {/* 상영관 */}
                    <td>비트박스{item.movie_cinema} {item.movie_theater}</td>
                    {/* 상영일시 */}
                    <td>{item.movie_date} / {item.movie_time}</td>
                    {/* 인원 */}
                    <td style={{width:'200px'}}>
                        {item.movie_seat.filter(item=>item.customer==='adult').length===0? '':`성인: ${item.movie_seat.filter(item=>item.customer==='adult').length} `}
                        {item.movie_seat.filter(item=>item.customer==='child').length===0? '':`청소년: ${item.movie_seat.filter(item=>item.customer==='child').length} `}  
                    </td>
                    {/* 좌석 */}
                    <td>
                        {
                            item.movie_seat.map((item1,index)=>(
                                <span key= {item1.id}>{item1.number}{index===item.movie_seat.length-1? '':','}</span>
                            ))
                        }
                    </td>
                    {/* 상영예정 */}
                    <td>{item.movie_status}</td>
                        
                        
              </tr>
              
            ))
        }
        </table>
        <ReservationModal open={modalOpen} close={closeModal} header="예약내역" closeBtn="창닫기" viewReservation={viewReservation} reservationCancel={reservationCancel}>
            
        </ReservationModal>
            </>
        }  
        </>
    );
};

export default Success;