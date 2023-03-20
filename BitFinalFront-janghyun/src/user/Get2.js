import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import emptySeat from './emptySeat';
import styles from '../css/Get.module.css';
import axios from 'axios';

const Get2 = () => {
    const {pk} = useParams();
    //빈배열
    var empty=emptySeat;

    //현재 좌석현황
    const [filler,setFiller]=useState([])
    //빈배열 + 현재좌석현황
    const [roomStatus,setRoomStatus] = useState([]);

    //상영정보 + 현재좌석현황 가져오기.
    useEffect(()=>{
        seatGetter()
    },[])
    const seatGetter =()=>{
        axios.get(`https://jjh.herokuapp.com:8080/book/getSeat?pk=${pk}`)
            .then(res=>{
                var copy = res.data;
                setFiller(JSON.parse(copy.movie_seat))
            }).catch(err=>console.log(err))
    }

    //상영관 예약현황 덮어쓰기
    useEffect(()=>{
        var copyStatus=[];
        empty.map((item,index)=>{
            var small=[]
            empty[index].map((item)=>{
                var exist= false
                filler.map(fitem=>{
                    exist = item!==null && item.id===fitem.id? true:exist;
                })
                small.push(exist? {...item,isReserved:true}:item);
            })
            copyStatus[index]=small
        })
        setRoomStatus(copyStatus)
    },[filler])

    return (
        <>

            <div className={styles.container2}>
                <div className={styles.seats2}>
                    <div className={styles.screen2}>screen</div><br/>

                    {
                        roomStatus.map((item,index)=>(
                            <div key={index} className={styles.part}>
                                {
                                    roomStatus[index].map((item,smallIndex)=>(
                                        <div key={smallIndex} className ={item===null? styles.noSeat2:item.isReserved? styles.alreadyReserved2:!item.customer?styles.oneSeat2:item.customer==='adult'? styles.adultSelected2:styles.childSelected2} id={item?item.id:''}/>

                                    ))
                                }
                            </div>
                        ))
                    }
                    <br/>
                </div>  {/* seats */}

            </div>

        </>
    );
};

export default Get2;