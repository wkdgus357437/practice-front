import { GET, POST }  from "./fetch-auth-action";

// 토큰을 만드는 함수 auth-action.ts 내부에서만 사용.
const createTokenHeader = (token:string) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}

// 토큰의 만료시간을 계산하는 함수, auth-action.ts 내부에서만 사용.
const calculateRemainingTime = (expirationTime:number) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};


// 토큰값과 만료시간을 받으면 localStorage 에 저장해주는 함수. 남은 시간을 반환.
export const loginTokenHandler = (token:string, expirationTime:number, refreshToken:string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('expirationTime', String(expirationTime));

    const remainingTime = calculateRemainingTime(expirationTime);
    return remainingTime;
}

// localStorage 내부에 토큰이 존재하는지 검색하는 함수.
export const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime') || '0';
    // 존재 시 만료까지 남은 시간과 토큰값을 같이 객체로 반환.
    const remaingTime = calculateRemainingTime(+ storedExpirationDate);

    if(remaingTime <= 1000) { // 만약 시간이 1초 아래로 남았으면 자동으로 토큰을 삭제해줌
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null
    }

    return {
        token: storedToken,
        duration: remaingTime
    }
}

// 회원가입 URL 로 POST 방식으로 호출.
export const signupActionHandler = (username: string, password: string, name:string, birth:string, phoneNumber:string, email:string) => {
    const URL = '/auth/signup'
    const signupObject = { username, password, name, birth, phoneNumber, email };
    // 통신으로 반환된 response 를 반환.
    // 반환 타입 Promise<AxiosResponse<any, any> | null>
    const response = POST(URL, signupObject, {});
    return response;
};

// 로그인 POST
export const loginActionHandler = (username:string, password: string) => {
    const URL = '/auth/login';
    const loginObject = { username, password };
    console.log(loginObject)
    const response = POST(URL, loginObject, {});

    return response;
};

// 로그아웃 함수.
// localStorage 에 저장된 토큰과 만료시간을 삭제.
export const logoutActionHandler = () => {
    console.log("토큰 삭제됨");
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('refreshToken');
};


// 유저 정보를 GET 방식 호출.
// 토큰값을 헤더에 넣고 호출.
// Promise 객체인 response 를 반환.
export const getUserActionHandler = (token:string) => {
    const URL = '/member/me';
    const response = GET(URL, createTokenHeader(token));
    return response;
}


// 이름과 패스워드를 바꿔주는 함수들.
// 둘다 token 값을 헤더에 붙여 POST 방식으로 호출
// 이름에는 바꿀 이름만 값으로 보내주고, 패스워드는 기존 패스워드와 현재의 패스워드 둘다 보내줌.
// Promise 객체인 response 를 반환
export const changeNameActionHandler = ( name:string, token: string) => {
    const URL = '/member/nickname';
    const changeNicknameObj = { name };
    const response = POST(URL, changeNicknameObj, createTokenHeader(token));

    return response;
}

// 비밀번호 변경
export const changePasswordActionHandler = (
    exPwd: string,
    newPwd: string,
    token: string
) => {
    const URL = '/member/password';
    const changePasswordObj = { exPwd, newPwd }
    const response = POST(URL, changePasswordObj, createTokenHeader(token));
    return response;
}