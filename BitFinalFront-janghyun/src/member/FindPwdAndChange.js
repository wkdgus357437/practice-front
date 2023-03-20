import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import joinForm from "src/member/JoinForm.module.css";
import {removeCookieToken} from "src/member/storage/Cookie";

const FindPwdAndChange = () => {

    const navi = useNavigate();
    const params = useLocation();

    const certifOk = params.state.certifOk;
    const username = params.state.username;

    useEffect(() => {
        if (certifOk === null) {
            alert("ㅅㄱ");
            navi("/member/loginForm");
        }
    }, [])

    const [disable, setDisable] = useState(true);

    // 비밀번호 체크
    const [inputPwdChk, setInputPwdChk] = useState("");
    // 비밀번호 확인 체크
    const [inputRePwdChk, setInputRePwdChk] = useState("");

    const [form, setForm] = useState({
        username: username,
        password: ''
    })

    // input 값 setForm
    const inputValue = (e) => {

        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        });

    }

    const {password} = form;

    const changePwdActionHandler = () => {
        axios.post('https://jjh.herokuapp.com:8080/member/findAndChangePassword', null, {params: form})
            .then(() => {
                alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요');
                localStorage.removeItem("accessToken");
                localStorage.removeItem("expireTime");
                removeCookieToken();
                navi("/");
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div style={{marginTop:"200px"}}>
                <h1 className={joinForm.ci}>
                    <a href="/" title="메인 페이지로 이동" style={{backgroundSize: 150}}>
                        BITBOX : Life Theater
                    </a>
                </h1>
                <div className={joinForm.page_info_txt}
                     style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom:"30px"}}>
                    <span style={{fontSize:"35px"}}>비밀번호 변경</span>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className={joinForm.table_wrap}>
                        <table className={`${joinForm.board_form} ${joinForm.write}`}>

                            <colgroup>
                                <col style={{width: 130}}/>
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">
                                    <label htmlFor="ibxJoinInfoRegLoginPwd">
                                        새 비밀번호*{/*비밀번호*/}
                                    </label>
                                </th>
                                <td>
                                    <input
                                        maxLength={16}
                                        id="password"
                                        type="password"
                                        name='password'
                                        placeholder="비밀번호"
                                        className={`${joinForm.input_text} ${joinForm.w260px}`} //" w260px"
                                        value={password}
                                        onChange={inputValue}
                                        onBlur={(e) => {
                                            if (!e.target.value) {
                                                setInputPwdChk("필수 입력정보입니다");
                                            } else {
                                                setInputPwdChk("");
                                            }
                                        }}
                                    />
                                    <div style={{width: "auto"}}>
                                        <div id="nameDiv" style={{
                                            marginLeft: "65px",
                                            color: "#B20710",
                                            fontSize: "10pt",
                                            textAlign: "left"
                                        }}>{inputPwdChk} </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label htmlFor="ibxJoinInfoRegLoginPwdConfirm">
                                        비밀번호 확인*{/*비밀번호 확인*/}
                                    </label>
                                </th>
                                <td>
                                    <input
                                        maxLength={16}
                                        id="ibxJoinInfoRegLoginPwdConfirm"
                                        type="password"
                                        placeholder="비밀번호 확인"
                                        className={`${joinForm.input_text} ${joinForm.w260px}`} //" w260px"
                                        onChange={(e) => {
                                            if (password !== e.target.value) {
                                                setInputRePwdChk("비밀번호가 일치하지 않습니다");
                                                setDisable(true);
                                            } else {
                                                setInputRePwdChk("");
                                                setDisable(false);
                                            }
                                        }}
                                    />
                                    <div style={{width: "auto"}}>
                                        <div id="nameDiv" style={{
                                            marginLeft: "5px",
                                            color: "#B20710",
                                            fontSize: "10pt",
                                            textAlign: "left"
                                        }}>{inputRePwdChk} </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={joinForm.btn_member_bottom}
                     style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"30px"}}>
                    <button
                        style={{width:"420px"}}
                        id="btnJoinInfoRegButton"
                        type="button"
                        className={`${joinForm.button} ${joinForm.purple} ${joinForm.large}`}
                        onClick={changePwdActionHandler}
                        disabled={disable}
                    >
                        비밀번호 변경
                    </button>
                </div>
            </div>
        </>
    );
};

export default FindPwdAndChange;