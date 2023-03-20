import axios, { AxiosError,AxiosResponse }  from 'axios';

type ServerError = { errorMessage: string };
type LoginFailType = { status: number, error: string,};

interface FetchData {
    method: string,
    url: string,
    data? : {},
    header : {},
}

const fetchAuth = async (fetchData: FetchData) => {
    const method = fetchData.method;
    const url = fetchData.url;
    const data = fetchData.data;
    const header = fetchData.header;

    try {
        const response:AxiosResponse<any, any> | false =
            (method === 'get' && (await axios.get(url, header))) ||
            (method === 'post' && (await axios.post(url, data, header))) ||
            (method === 'put' && (await axios.put(url, data, header))) ||
            (method === 'delete' && (await axios.delete(url, header))
            );

        if(response && response.data.error) {
            console.log((response.data as LoginFailType).error);
            return null;
        }

        if (!response) {
            return null;
        }

        return response;

    } catch(err) {

        if (axios.isAxiosError(err)) {
            const serverError = err as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                console.log(serverError.response.data);
                return null;
            }
        }

        console.log(err);
        return null;
    }

}

const GET = ( url:string, header:{} ) => {
    const response = fetchAuth({ method: 'get', url, header });
    return response;
};

const POST = ( url:string, data: {}, header:{}) => {
    const response = fetchAuth({ method: 'post', url, data, header })
    return response;
};

const PUT = async ( url:string, data: {}, header:{}) => {
    const response = fetchAuth({ method: 'put', url, data, header });
    return response;
};

const DELETE = async ( url:string, header:{} ) => {
    const response = fetchAuth({ method: 'delete', url, header });
    return response;
};

export { GET, POST, PUT, DELETE }

// Rest API 에서 주로 쓰이는 GET, POST, PUT, DELETE 를 각각 메소드로 분리
// 에러를 catch 하는 부분만 따로 추상화를 해서, 제시되는 메소드 변수에 따라 다른 로직으로 구현.
// 또한 에러가 캐치되면 모두 null 반환.
// 각각의 메소드들은 response 로 Promise<AxiosResponse<any, any> | null>을 반환.