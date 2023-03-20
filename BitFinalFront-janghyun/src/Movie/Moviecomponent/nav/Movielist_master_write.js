import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/writeForm.module.css";

const Movielist_master_write = () => {
    
    const navigate = useNavigate();

    const imgRef = useRef()

    const [file, setFile] = useState('')

    const [showImgSrc , setShowImgSrc] = useState('')

    const [form, setForm] = useState({
        img_url: "",
        movie_class:"1",
        movie_grade: "00.png",
        movie_title: "",
        movie_release_start: "",
        movie_release_end: "",
        movie_reserve_rate:"0",
        movie_already_release:"1"

    });

    const { img_url, movie_class, movie_grade, movie_title, movie_release_start, movie_release_end, movie_reserve_rate, movie_already_release } = form;
    
    console.log(img_url)
    console.log(movie_class)
    console.log(movie_grade)
    console.log(movie_title)
    console.log(movie_release_start)
    console.log(movie_release_end)
    console.log(movie_already_release)

    const onInput = (e) => {
        const { name, value } = e.target;
        console.log(typeof(movie_already_release)+"/"+typeof(value))
        setForm({
            ...form,
            [name]: value,

        });
    };

    const [movie_titleDiv, setMovie_titleDiv] = useState("");

    const [movie_release_startDiv, setMovie_release_startDiv] = useState("");
    const [movie_release_endDiv, setMovie_release_endDiv] = useState("");

    const onWriteSubmit = (e) => {

        var sw = 1;

        if (!movie_title) {
            setMovie_titleDiv("영화제목을 입력하세요");
            sw = 0;
        }
        if (!movie_release_start) {
            setMovie_release_startDiv("개봉일을 입력하세요");
            sw = 0;
        }
        if (!movie_release_end) {
            setMovie_release_endDiv("개봉종료일을 입력하세요");
            sw = 0;
        }
        if (sw === 1) {
            var formData = new FormData()
            formData.append('img',file)
            console.log(formData)

           // formData.append("movieData", new Blob(JSON.stringify(movieData),{type: "application/json"}))
            console.log("업로드")
            axios.post('https://jjh.herokuapp.com:8080/movielist/upload',formData, {
                    headers : {
                         'Content-Type':`multipart/form-data`
                    }
                })
                    .then()
                    .catch((error) => console.error(error));
            console.log("영화등록")
            axios.post('https://jjh.herokuapp.com:8080/movielist/write', null, {params: form})
                 .then(() => {
                    alert("영화가 등록되었습니다.");
                    navigate("/master");
                })
                .catch(error => console.log(error))
        }
    };

    const onReset = (e) => {
        setForm({
            movie_title: '',
            movie_release_start: '',
            movie_release_end: ''
        })
    }

    const check_movie_title = () => {
        axios
            .get(`https://jjh.herokuapp.com:8080/movielist/isExistMovie_title?movie_title=${movie_title}`)
            //아이디중복검사를 해서 데이터베이스에 없으면 사용가능, 있으면 사용 불가능
            .then(res =>{
                setMovie_titleDiv(res.data ==='non_exist' ? '사용가능' : '사용 불가능')
            })
            .catch(error => console.log(error))
    }

    const onCamera = () =>{
        imgRef.current.click()
    }

    const readURL = (input) => {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0])

        reader.onload = () => {
            console.log(input.files[0])
            setShowImgSrc(reader.result)
            setFile(input.files[0])
            setForm({
                ...form,
                img_url : input.files[0].name
            })
        
        }
    }

    
    return (
        <>
            <div className={styles.writeForm}>
                <table className='Movie_movieForm'>
                    <tbody>
                        <tr>
                            <td>영화 포스터
                            <div>
                                <img src={ showImgSrc }width='300' height='300' /> &emsp;
                        {/* public/image에 있는 이미지 가져오기. 
                        public/index.html에서 시작하기떄문에  ../ 로 시작한다.*/}     {/* onClick={() => (imgRef.current.click()} */}
                                                                                    {/* onClick={() => (document.getElementById('img').click())} */}
                                <img src='../storage/camera.png'  width='50' height='50'onClick={ onCamera } alt='카메라'/>
                                <input type='file' id='img' name='img' ref={imgRef} onChange={ e=> readURL(e.target)}style={{visibility: 'hidden'}}/>
                                <br/>
                                <br/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>영화분류 &nbsp;&nbsp;
                                <input type="radio" name="movie_class" value="1" onChange={onInput} defaultChecked />박스오피스&nbsp;
                                <input type="radio" name="movie_class" value="2" onChange={onInput}/>상영예정작&nbsp;
                                <input type="radio" name="movie_class" value="3" onChange={onInput}/>특별상영&nbsp;
                                <input type="radio" name="movie_class" value="4" onChange={onInput}/>필름소사이어티&nbsp;
                                <input type="radio" name="movie_class" value="5" onChange={onInput}/>클래식소사이어티&nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td>나이제한 &nbsp;&nbsp;
                                <input type="radio" name="movie_grade" value="00.png" onChange={onInput} defaultChecked />ALL
                                <input type="radio" name="movie_grade" value="12.png" onChange={onInput}/>12grade
                                <input type="radio" name="movie_grade" value="15.png" onChange={onInput}/>15grade
                                <input type="radio" name="movie_grade" value="18.png" onChange={onInput}/>19grade
                            </td>
                        </tr>
                        <tr>
                            <td>영화제목 &nbsp;&nbsp;
                                <input type="text" name="movie_title" value={movie_title} onChange={onInput} onBlur={check_movie_title} />
                                &nbsp;&nbsp; / 개봉중
                                <input type="radio" name="movie_already_released" value="0" onChange={onInput} defaultChecked />,
                                개봉예정
                                <input type="radio" name="movie_already_released" value="1" onChange={onInput}/>
                                <div id="movie_titleDiv">{movie_titleDiv}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>개봉일 &nbsp;&nbsp;
                                <input type="date" name="movie_release_start" value={movie_release_start} onChange={onInput} />
                                <div id="movie_releaseDiv">{movie_release_startDiv}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>개봉종료일 &nbsp;&nbsp;
                                <input type="date" name="movie_release_end" value={movie_release_end} onChange={onInput} />
                                <div id="movie_releaseDiv">{movie_release_endDiv}</div>
                            </td>
                        </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <button onClick={ onWriteSubmit }>등록</button>
                                    <button onClick={ onReset }>취소</button>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </>
    );
};

export default Movielist_master_write;