import React, {useEffect, useState} from 'react';
import axios from "axios";

function Test(props) {
    const [moviecdNum,setMoviecdNum] = useState('')
    const[otherQuery,setOtherQuery] = useState('')
    const[otherData,setOtherData] = useState([]);
    const te = () => {
        const url3 = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json';
        axios.get(url3,{
            params:{
                key: '0d28095f9f31dd96948bdf3a57f427d1',
                movieNm : moviecdNum
            }
        }).then(res => setOtherQuery(res.data.movieListResult.movieList[0].movieCd)
        )
    }
        useEffect(()=>{
            const url4 = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json';
            axios.get(url4,{
                params:{
                    key: '0d28095f9f31dd96948bdf3a57f427d1',
                    movieCd : otherQuery
                }
            }).then(res => setOtherData(res.data)
            )
        },[setOtherQuery])

        return (
            <div>
                <table border={13}>
                    <tr>
                        <input  onChange={(e) => setMoviecdNum(e.target.value)}/>
                        <br/>
                        <div>{JSON.stringify(otherData)}</div>
                        {/*<img src={data} alt="d"/>*/}
                    </tr>
                </table>
                <button onClick={te}>클릭</button>
            </div>
        );

}
export default Test;

/* as been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. */