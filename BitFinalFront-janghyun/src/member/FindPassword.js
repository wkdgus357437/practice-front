import React, {useEffect, useState} from 'react';
import joinForm from "src/member/JoinForm.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const FindPassword = () => {

    const navi = useNavigate();


    // 비번찾기 셋
    const [form, setForm] = useState({
        username: '',
        name: '',
        birth: '',
        phoneNumber: '',
    });


    // input 값 setForm
    const inputValue = (e) => {

        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        });

    }

    const {username, name, birth, phoneNumber} = form;

    // 아이디 값 체크
    const [inputIdChk, setInputIdChk] = useState("");
    // 이름 값 체크
    const [inputNameChk, setInputNameChk] = useState("");
    // 생년월일 체크
    const [inputBirthChk, setInputBirthChk] = useState("");
    // 핸드폰번호 체크
    const [inputPhoneChk, setInputPhoneChk] = useState("");


    // 본인인증
    const onClickCertificate = () => {

        const {IMP} = window;
        IMP.init('imp10391932');

        const data = {
            merchant_uid: `mid_${new Date().getTime()}`,
            company: 'bitBox',
            carrier: '',
            name: name,
            phone: phoneNumber
        };

        IMP.certification(data, callback);
    }

    const callback = (response) => {
        const {
            success,
            merchantUid,
            errorMsg,
        } = response;

        if (success) {
            alert('인증이 완료되었습니다.');

            const aa = 1;
            navi("/member/findPwdAndChange", {
                state:{
                    certifOk: aa,
                    username: username
                }
            })
        } else {
            alert(`fail : ${errorMsg}`);
        }
    }


    const findPasswordActionHandler = () => {
        axios.get("https://jjh.herokuapp.com/member/findPassword", {params: form})
            .then(res => {
                if (res.data) {
                    onClickCertificate();

                } else {
                    alert("입력하신 정보를 찾을 수 없습니다");
                }
            })
            .catch(error => console.log(error));
    }


    return (
        <>
            <div className={joinForm.page_info_txt}>
                <span></span>
            </div>
            <div className={joinForm.table_wrap}>
                <table className={`${joinForm.board_form} ${joinForm.write}`} style={{width:"100%", margin:"0"}}>
                    <caption>
                    </caption>
                    <colgroup>
                        <col style={{width: 130}}/>
                        <col/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">아이디*</th>
                        <td id="ibxMbJoinInfoRegBirthDe">
                            <input
                                maxLength={16}
                                id="username"
                                name="username"
                                type="text"
                                placeholder="아이디"
                                className={`${joinForm.input_text} ${joinForm.w260px}`} //" w260px"
                                value={username}
                                onChange={inputValue}
                                onBlur={(e) => {
                                    if (!e.target.value) {
                                        setInputIdChk("필수 입력정보입니다.");
                                    } else {
                                        setInputIdChk("");
                                    }
                                }}
                            />
                            <div style={{width: "auto"}}>
                                <div id="nameDiv" style={{
                                    marginLeft: "73px",
                                    color: "#B20710",
                                    fontSize: "10pt",
                                    textAlign: "left"
                                }}>{inputIdChk}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">이름*</th>
                        <td id="ibxMbJoinInfoRegBirthDe">
                            <input
                                maxLength={16}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="이름"
                                className={`${joinForm.input_text} ${joinForm.w260px}`} //" w260px"
                                value={name}
                                onChange={inputValue}
                                onBlur={(e) => {
                                    if (!e.target.value) {
                                        setInputNameChk("필수 입력정보입니다.");
                                    } else {
                                        setInputNameChk("");
                                    }
                                }}
                            />
                            <div style={{width: "auto"}}>
                                <div id="nameDiv" style={{
                                    marginLeft: "73px",
                                    color: "#B20710",
                                    fontSize: "10pt",
                                    textAlign: "left"
                                }}>{inputNameChk}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">생년월일*</th>
                        <td id="ibxMbJoinInfoRegBirthDe">
                            <input
                                maxLength={6}
                                id="birth"
                                name="birth"
                                type="number"
                                placeholder="생년월일 6자리"
                                className={`${joinForm.input_text} ${joinForm.w260px}`} //" w260px"
                                value={birth}
                                onChange={inputValue}
                                onBlur={(e) => {
                                    if (!e.target.value) {
                                        setInputBirthChk("필수 입력정보입니다.");
                                    } else if (e.target.value.length !== 6) {
                                        setInputBirthChk("6자리를 입력해주세요!");
                                    } else {
                                        setInputBirthChk("");
                                    }
                                }}
                            />
                            <div style={{width: "auto"}}>
                                <div id="nameDiv" style={{
                                    marginLeft: "73px",
                                    color: "#B20710",
                                    fontSize: "10pt",
                                    textAlign: "left"
                                }}>{inputBirthChk}</div>
                            </div>
                        </td>
                    </tr>
                    {/* 휴대폰 번호 불러올때 */}
                    <tr id="trMblpTelno">
                        <th scope="row">휴대폰 번호* {/*휴대폰 번호 */}</th>
                        <td>
                            <input
                                maxLength={11}
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="' - ' 없이 입력해주세요"
                                className={`${joinForm.input_text} ${joinForm.w260px}`} //" w260px"
                                value={phoneNumber}
                                onChange={inputValue}
                                onBlur={(e) => {
                                    if (!e.target.value) {
                                        setInputPhoneChk("필수 입력정보입니다.");
                                    } else if (e.target.value.length !== 11) {
                                        setInputPhoneChk("11자리를 입력해 주세요");
                                    } else {
                                        setInputPhoneChk("");
                                    }
                                }}
                            />
                            <div style={{width: "auto"}}>
                                <div id="nameDiv" style={{
                                    marginLeft: "70px",
                                    color: "#B20710",
                                    fontSize: "10pt",
                                    textAlign: "left"
                                }}>{inputPhoneChk}</div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={joinForm.btn_member_bottom}>
                <button
                    id="btnJoinInfoRegButton"
                    type="button"
                    className={`${joinForm.button} ${joinForm.purple} ${joinForm.large}`}
                    onClick={() => {
                        if (!(username && name && birth && phoneNumber)) {
                            alert("필수 정보가 입력되지 않았습니다");
                        } else {
                            findPasswordActionHandler();
                        }
                    }}
                >
                    본인인증
                </button>
            </div>
        </>
    );
};

export default FindPassword;