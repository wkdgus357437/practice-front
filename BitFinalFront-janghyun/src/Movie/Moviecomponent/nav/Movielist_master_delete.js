import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const Movielist_master_delete = () => {

        
        const [movie_title, setMovie_title] = useState('')
        const [result, setResult] = useState('')
    
        const navigate = useNavigate();
    
        const onSearch = () => {
            axios
                .get(`https://jjh.herokuapp.com/movielist/getMovie?id=${movie_title}`)
                .then(res => {
                    res.data === null?
                    setMovie_title('')||setResult('찾는영화가 없습니다.')
                    :
                    axios.delete(`https://jjh.herokuapp.com/movielist/Movie_delete?id=${movie_title}`)
                        .then(() => {
                            alert("영화정보를 삭제하였습니다.")
                            setResult('')
                            navigate("/master/list");
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }

    return (
        <div>
            <h1>
                영화정보 삭제
            </h1>
            <hr/>
            <p>
                삭제할 영화제목 입력 : &nbsp;
                <input type="text" id="movie_title" value={movie_title} onChange={(e) => setMovie_title(e.target.value)}/>
                &emsp;
                <button onClick={onSearch}>검색</button>
            </p>
            <div id='resultDiv' style={{color: 'red', fontWeight:'bold'}}>{result}</div>
        </div>
    );
};
export default Movielist_master_delete;