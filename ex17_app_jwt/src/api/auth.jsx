import axios from 'axios';

const API = axios.create(
    {
        baseURL:'http://localhost:8090',
        //baseURL : 'http://192.168.2.229:8090',
        withCredentials : true // 쿠키 전송에 필요한 설정(JWT 토큰 사용 시 필요)
    }
);

//인터셉터 리퀘스트 객체 사용
API.interceptors.request.use(
    (config)  => {
        const token = localStorage.getItem('token');
        console.log("전송할 토큰 : " + token);

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }  
);

//컴포넌트 여러개의 함수, 변수를 내보낼 수 있다.
// 함수를 저장하고 있는 객체를 내보냄(자바스크립트는 1급 객체 - 함수를 변수에 저장할 수 있고, 파라미터로 받을 수 있고, 리턴 할 수 있음)
export const login = (data) => API.post('/login', data); // 로그인(id,pwd)
export const register = (data) => API.post('/register', data); //회원가입

export const getUserInfo = () => API.get('/user/info');//user_info
// API.post('/login')
// 인터셉터 해서 설정 확인 가능(로그인 여부)