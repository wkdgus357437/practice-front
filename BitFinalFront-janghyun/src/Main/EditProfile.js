import React, {useEffect, useState} from 'react';
import editProfile from './EditProfile.module.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {removeCookieToken} from "src/member/storage/Cookie";

const EditProfile = () => {

    const navi = useNavigate();

    const tokenVal = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get("/member/me", {
            headers: {
                Authorization: `Bearer ${tokenVal}`
            }
        }).then(res => {
            setForm(res.data);
        }).catch(error => {
            console.log(error.response);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expireTime');
            removeCookieToken();
            navi("/member/loginForm");
        })
    }, [])

    const [exPwd, setExPwd] = useState('');

    // 정보수정 세팅
    const [form, setForm] = useState({
        name: '',
        birth: '',
        phoneNumber: '',
        username: '',
        password: '',
        email: ''
    });


    // input 값 setForm
    const inputValue = (e) => {

        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        });

    }

    const {name, username, birth, email, phoneNumber, password} = form;


    const [disable, setDisable] = useState(true);
    // 비밀번호 체크
    const [inputPwdChk, setInputPwdChk] = useState("");


    const displayText = (e) => {
    };

    const onReset = () => {
        window.location.replace("/myPage")
    };

    // 본인인증
    const onClickCertificate = () => {

        const {IMP} = window;
        IMP.init('imp10391932');

        const data = {
            merchant_uid: `mid_${new Date().getTime()}`,
            company: 'bitBox',
            carrier: '',
            name: '',
            phone: ''
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
            alert("인증완료");
        } else {
            alert("인증취소");
        }
    }



    // 기존 비밀번호 체크
    const exPwdChk = () => {
        setInputPwdChk('');
        axios.post('/member/exPwdChk', null, {params:{username, password:exPwd}})
            .then(res => {
                setInputPwdChk(res.data === 'correct' ? '' : '비밀번호가 일치하지 않습니다')
                if (res.data === 'correct') {
                    setDisable(false);
                } else {
                    setDisable(true)
                }
            })
            .catch(error => console.log(error));
    }

    const onEmailChange = () => {
        console.log(email)
        axios.get(`https://jjh.herokuapp.com:8080/myPage/emailChange?username=${username}&email=${email}`)
            .then(res => {
                alert("이메일 변경이 완료되었습니다.");
                window.location.replace("/myPage");
            }).catch(err => {console.log(err)})
    }


    return (
        <>
            <div style={{width: "100%", display: "flex", paddingTop: "30px"}}>
                <div style={{width: "800px", margin: "auto"}}>
                    <div id="contents" className={editProfile.editProfile_first}>
                        <ul className={`${editProfile.board_list_util} ${editProfile.suntory}`}>
                            <li>회원님의 정보를 정확히 입력해주세요.</li>
                        </ul>
                        <div className={`${editProfile.tit_util} ${editProfile.mt400} ${editProfile.suntory}`}>
                            <h3 className={editProfile.tit}>기본정보</h3>
                            <div className={editProfile.right}>
                                <p className={editProfile.reset}>
                                    <em className={editProfile.font_orange}>*</em> 필수
                                </p>
                            </div>
                        </div>
                        <form name="mbInfoForm" className={editProfile.mbInfoForm}>
                            <input type="hidden" name="id" defaultValue=""/>
                            <input type="hidden" name="mbNo" defaultValue={12788089}/>
                            <input type="hidden" name="phoneNo" defaultValue="010-0000-0000"/>
                            <input type="hidden" name="mbProfilFileNo" defaultValue=""/>
                            <input type="hidden" id="mbByymmdd" defaultValue={19900000}/>
                            <div className={`${editProfile.table_wrapp} ${editProfile.mb400}`}>
                                <table className={editProfile.board_form}>
                                    <caption>
                                        이름, 생년월일, 휴대폰, 이메일, 비밀번호, 주소 항목을 가진 기본정보 표
                                    </caption>
                                    <colgroup>
                                        <col style={{width: 180}}/>
                                        <col/>
                                    </colgroup>
                                    <tbody>
                                    <tr>
                                        <th scope="row">아이디 <em className={editProfile.font_orange}>*</em>
                                        </th>
                                        <td>{username}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            이름 <em className={editProfile.font_orange}>*</em>
                                        </th>
                                        <td>
                                            <span className={editProfile.mbNmClass}>{name}</span>&nbsp;&nbsp;
                                            <button
                                                type="button"
                                                className={`${editProfile.buggon} ${editProfile.small} ${editProfile.gray_line} ${editProfile.change_phone_num}`}
                                                id="changeName"
                                                title="이름변경"
                                                onClick={onClickCertificate}
                                            >
                                                이름변경
                                            </button>&nbsp;
                                            ※ 개명으로 이름이 변경된 경우, 회원정보의 이름을 변경하실 수
                                            있습니다.
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            생년월일 <em className={editProfile.font_orange}>*</em>
                                        </th>
                                        <td>{birth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="num">휴대폰</label>{" "}
                                            <em className={editProfile.font_orange}>*</em>
                                        </th>
                                        <td>
                                            <div className={editProfile.clearfix}>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="mbEmail"
                                                    className={`${editProfile.input_text} ${editProfile.w500px}`}
                                                    onChange={displayText}
                                                    value={phoneNumber}
                                                />
                                                <button
                                                    type="button"
                                                    className={`${editProfile.buggon} ${editProfile.small} ${editProfile.gray_line} ${editProfile.change_phone_num}`}
                                                    id="phoneChgBtn"
                                                    title="휴대폰번호 변경"
                                                    onClick={onClickCertificate}
                                                >
                                                    휴대폰번호 변경
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="email">이메일</label>{" "}
                                            <em className={editProfile.font_orange}>*</em>
                                        </th>
                                        <td>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder={email}
                                                name="email"
                                                className={`${editProfile.input_text} ${editProfile.w500px}`}
                                                defaultValue=""
                                                onChange={(e) => {inputValue(e)}}
                                            />
                                            <button
                                                type="button"
                                                className={`${editProfile.buggon} ${editProfile.small} ${editProfile.gray_line} ${editProfile.change_phone_num}`}
                                                id="changeNewEmail"
                                                title="이메일 변경"
                                                onClick={ onEmailChange } >
                                                이메일 변경
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            기존 비밀번호 <em className={editProfile.font_orange}>*</em>
                                        </th>
                                        <td>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="기존 비밀번호를 입력해주세요"
                                                className={`${editProfile.input_text} ${editProfile.w500px}`}
                                                onChange={(e) => {setExPwd(e.target.value)}}
                                                onBlur={(e) => {
                                                    exPwdChk(e.target.value)
                                                }}

                                            />
                                            <button
                                                type="button"
                                                className={`${editProfile.buggon} ${editProfile.small} ${editProfile.gray_line} ${editProfile.change_phone_num}`}
                                                id="changeNewPassword"
                                                title="비밀번호 변경"
                                                disabled={disable}
                                                onClick={() => {
                                                    navi("/member/findPwdAndChange", {
                                                        state:{
                                                            certifOk: 2,
                                                            username: username
                                                        }
                                                    });
                                                }}
                                            >
                                                비밀번호 변경
                                            </button>
                                            <div style={{width: "auto"}}>
                                                <div id="editpwdDiv" style={{
                                                    marginLeft: "5px",
                                                    color: "#B20710",
                                                    fontSize: "10pt",
                                                    textAlign: "left"
                                                }}>{inputPwdChk} </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                        <div className={`${editProfile.btn_group} ${editProfile.mt400}`}>
                            <button className={`${editProfile.buggon} ${editProfile.large}`} id="cancelBtn"
                                    onClick={onReset}>
                                취소
                            </button>
                            <button className={`${editProfile.buggon} ${editProfile.purple} ${editProfile.large}`}
                                    id="updateBtn" onClick={() => {
                                alert("저장되었습니다");
                                navi("/")
                            }}>
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;