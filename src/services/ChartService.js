import axios from '../utils/httpRequest';

const getChartHomeAPI = () => {
    return axios.get(`/zing-chart/getChartHome`);
};

const getNewReleaseChartAPI = () => {
    return axios.get(`/zing-chart/getNewReleaseChart`);
};

export { getChartHomeAPI, getNewReleaseChartAPI };
