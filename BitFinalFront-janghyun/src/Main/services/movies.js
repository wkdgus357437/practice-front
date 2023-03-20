import axios from './axios';

const getTwentyMovies = async () => {
    return axios.get('/movies?page=1&size=20&sort=ticketRatio,desc')
        .then(response => response.data);
};
export { getTwentyMovies };
