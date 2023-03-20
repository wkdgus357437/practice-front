import {Cookies} from 'react-cookie';

// 쿠키 선언
const cookies = new Cookies();


// 로그인 할 때 리프레시 토큰 받으면 넣을 함수
export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set('refreshToken', refreshToken, {
        sameSite: 'strict', // 보안설정
        path: "/", // 쿠키값을 저장하는 서버 경로
        expires: new Date(expireDate) // 만료시간
    });
};


// accessToken 만료시 재발급 할때 써먹을 함수 (리프레시 토큰을 가지고있음)
export const getCookieToken = () => {
    return cookies.get('refreshToken');
};


// 로그아웃 할 때 써먹을 거 (쿠키 삭제함수)
export const removeCookieToken = () => {
    return cookies.remove('refreshToken', { sameSite: 'strict', path: "/"})

};