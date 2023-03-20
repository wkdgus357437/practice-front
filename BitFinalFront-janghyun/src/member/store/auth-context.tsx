import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './../auth-action';

let logoutTimer: NodeJS.Timeout;

type Props = { children?: React.ReactNode }
type UserInfo = { username: string, name: string};
type LoginToken = {
    grantType: string,
    accessToken: string,
    refreshToken: string,
    tokenExpiresIn: number
}

const AuthContext = React.createContext({ //createContext => 각각의 컴포넌트에 포함되는 객체를 만드는 로직
    // 객체안에는 state 와 state 를 컨트롤 하는 함수를 넣는다.
    // 이후 이 state 와 함수들은 인스턴스로 불러오게 된다.
    token: '',
    userObj: { username: '', name: '' },
    isLoggedIn: false,
    isSuccess: false,
    isGetSuccess: false,
    signup: (username: string, password: string, name:string, birth:string, phoneNumber:string, email:string) =>  {},
    login: (username:string, password: string) => {},
    logout: () => {},
    getUser: () => {},
    changeNickname: (name:string) => {},
    changePassword: (exPwd: string, newPwd: string) => {}
});

// Context 의 Provider 역할, Context 의 변화를 알리는 Provider 컴포넌트를 반환하는 함수.
// Provider 의 값들은 생성하거나 로직을 구현한 state 와 함수들을 넣어주고,
// props.children 을 통해 wrapping 될 모든 컴포넌트에게 적용되게 한다.
export const AuthContextProvider:React.FC<Props> = (props) => {

    const tokenData = authAction.retrieveStoredToken(); // 토큰값 회수 후 재정의

    let initialToken:any;
    if (tokenData) { // 만약 존재하게 된다면 initialToken 의 값은 tokenData 의 token 값이 된다.
        initialToken = tokenData.token!;
    }

    // 여기서 다시 token 을 token 이라는 상태변수에 넣어준다.
    const [token, setToken] = useState(initialToken);
    const [userObj, setUserObj] = useState({ //userObj 는 사용자의 정보를 담기 위한 객체
        username: '',
        name: ''
    });

    //isSuccess 와 isGetSuccess 는 정확히 데이터가 나왔는지, 비동기 시스템에서의 처리를 위한 상태이다.
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isGetSuccess, setIsGetSuccess ] = useState<boolean>(false);

    // userIsLoggedIn 은 반환하는 boolean 값이며, token 이 존재 유무에 따라 값이 변한다.
    const userIsLoggedIn = !!token;


    // 회원가입 함수.
    // form 에서 받은 username, password, name 을 받아서 auth-action.ts의 signupActionHandler 에 넣어준다.
    // 이후 받은 Promise 객체인 response 를 비동기처리를 통해 Promise 내부의 result 가 null 이 아닐경우,
    // 즉 error 가 없을 경우 isSuccess 의 상태를 변화시켜서 성공했음을 나타낸다.
    const signupHandler = (username: string, password: string, name:string, birth:string, phoneNumber:string, email:string) => {
        setIsSuccess(false);
        const response = authAction.signupActionHandler(username, password, name, birth, phoneNumber, email);
        response.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
            }
        });
    } // 회원가입

    // 로그인 함수, auth-action.ts 의 loginActionHandler 에서 받아온 데이터에서 토큰을 추출하고
    // 전역상태변수에 token 의 값을 설정하고, logoutTimer 에 setTimeout 을 통해 만료 시간이 지나면
    // logoutHandler 를 통해 로그아웃을 실행하게 만든다.
    // 만료시간은 auth-action.ts의 loginTokenHandler 에 토큰과 토큰 만료일을 넣고 반환된 값으로 설정.
    const loginHandler = (username:string, password: string) => {
        setIsSuccess(false);

        const data = authAction.loginActionHandler(username, password);
        data.then((result) => {
            if (result !== null) {
                const loginData:LoginToken = result.data;
                setToken(loginData.accessToken);
                logoutTimer = setTimeout(
                    logoutHandler,
                    authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn, loginData.refreshToken)
                );
                setIsSuccess(true);
            }
        })
    };

    // 로그아웃 함수는 앞의 useEffect 를 통해 토큰이 없어지면 자동으로 로그아웃을 실행하게 할 것이므로,
    // 무한루프를 막기 위해 useCallback 으로 감싸준다.
    // 이후 token 상태를 빈값으로 만들어주고,
    // auth-action.ts의 logoutActionHandler 로 localStorage 의 토큰값을 지우게 만든다음,
    // logoutTimer 가 존재한다면 Timer 또한 지워준다.
    const logoutHandler = useCallback(() => {
        setToken('');
        authAction.logoutActionHandler();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    // auth-action.ts의 getUserActionHandler 에 전역 상태에 있는
    // token 의 값을 넣어주고 Promise 객체인 data 를 받는다.
    // 이후 data 가 null 이 아닐 경우 안의 객체를 뽑아내, userObj 상태에 객체를 넣는다.
    const getUserHandler = () => {
        setIsGetSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if (result !== null) {
                console.log('userObj는 전역 상태변수 => 로그인만 하면 어디서든 임포트 후 유저정보 출력 가능');
                const userData:UserInfo = result.data;
                setUserObj(userData);
                setIsGetSuccess(true);
            }
        })

    };


    // 함수 자체에서 받은 변수 name 과 전역상태 token 을
    // auth-action.ts의 changeNameActionHandler 에 넣고 Promise 객체인 data 를 받는다.
    // 이후 data 가 null 이 아닐 경우 안의 객체를 뽑아내, userObj 상태변수에 객체를 넣는다.
    const changeNameHandler = (name:string) => {
        setIsSuccess(false);

        const data = authAction.changeNameActionHandler(name, token);
        data.then((result) => {
            if (result !== null) {
                const userData:UserInfo = result.data;
                setUserObj(userData);
                setIsSuccess(true);
            }
        })
    };

    // 에러 없이 실행될 경우 logoutHandler 를 실행하고 다시 로그인 하게 함.
    const changePasswordHandler = (exPwd:string, newPwd: string) => {
        setIsSuccess(false);
        const data = authAction.changePasswordActionHandler(exPwd, newPwd, token);
        data.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
                logoutHandler();
            }
        });
    };

    // retrieveStoredToken 로 받은 token 값과, logoutHandler 를 종속변수로 삼는 useEffect
    // 이를 통해 만료시간이 될 경우 자동으로 logoutHandler 를 실행시킨다.
    useEffect(() => {
        if(tokenData) {
            console.log("토큰 남은시간 : "+tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);


    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        signup: signupHandler,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
        changeNickname: changeNameHandler,
        changePassword: changePasswordHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;