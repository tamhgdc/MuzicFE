import axios from '../utils/httpRequest';

const getSong = (inputId) => {
    return axios.get(`/song/getSongById?id=${inputId}`);
};

const getSongInfo = (inputId) => {
    return axios.get(`/song/getSongInfo?id=${inputId}`);
};

export { getSong, getSongInfo };
