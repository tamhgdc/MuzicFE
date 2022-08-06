import axios from '../utils/httpRequest';

const getHomePage = (inputId) => {
    return axios.get(`/getHomePage?id=${inputId}`);
};

export { getHomePage };
