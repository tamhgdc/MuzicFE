import axios from '../utils/httpRequest';

const getDetailAlbum = (inputId) => {
    return axios.get(`/album/getDetailPlaylist?id=${inputId}`);
};

export { getDetailAlbum };
