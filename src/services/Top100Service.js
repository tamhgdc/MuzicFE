import axios from '../utils/httpRequest';

const getTop100API = () => {
    return axios.get(`/top100/getTop100`);
};

export { getTop100API };
