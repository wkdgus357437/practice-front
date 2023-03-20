import axios from 'axios';
import React, { useState , useEffect} from 'react';
import styles from "../css/writeForm.module.css";
const Movielist_master_list = () => {

    const [list, setList] = useState([]);
    const [searchOption, setSearchOption] = useState('movie_title');
    const [keyword, setKeyword] = useState('');
    useEffect(() => {
        axios.get('https://jjh.herokuapp.com:8080/movielist/getMovieList')
        .then(res => setList(res.data))
        .catch(err => console.log(err))
    },[])
    
    const onSearch = (e) => {
        e.preventDefault();
        axios
            .get('https://jjh.herokuapp.com:8080/movielist/Movie_search', {
                    params : {
                        searchOption : searchOption,
                        keyword: keyword
                    }})
            .then(res => setList(res.data))
            .catch(error => console.log(error))
    }

    return (
        <div>
            {
                list.map (item => {
                    return (
                        <ol className='Movielist_seq' key={item.movie_title}>
                            <li style={{ float:'left', margin: '10px 10px 10px 10px', listStyle:'none'}} >
                                <div className='Movielist_title_num'></div>
                                <img className='Movielist_title_img' src={`../storage/${item.img_url}`}/>
                                <div className='Movielist_title_area'>
                                    <img className='Movielist_grade_age' src={`../storage/${item.movie_grade}`}/>
                                    <p className='Movielist_title_maintitle'>{item.movie_title}</p>
                                </div>
                                <div className='Movielist_title_ratedate'>
                                    <span className='Movielist_title_rate'> 예매율 {item.movie_reserve_rate}% &nbsp; | &nbsp;</span>
                                    <span className='Movielist_title_date'> 개봉일 {item.movie_release}</span>
                                </div>
                                <div className='Movielist_Btnlist'>
                                    <button type='button' className='Movielike_Btn'> {item.movie_like}</button>
                                    <button type='button' className='Movie_Btn_reserve'> 예매 </button>
                                </div>
                            </li>
                        </ol>
                    )
                })
            }
            <br/><br/>
            <div style={{width: '450px', textAlign: 'center', margin: '30px'}}>
                <form id="searchForm">
                    <select id="searchOption" name="searchOption">
                        <option value="movie_title">영화제목</option>
                    </select>&nbsp;
                    <input type="text" id="keyword" value={keyword} onChange={e=> setKeyword(e.target.value)}/> &nbsp;
                    <button onClick={onSearch}>검색</button>
                </form>
            </div>
        </div>
    );
};

export default Movielist_master_list;