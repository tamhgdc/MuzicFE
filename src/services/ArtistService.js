import axios from '../utils/httpRequest';

const getArtistAPI = (artist) => {
    return axios.get(`/artist/getArtist?artist=${artist}`);
};

export { getArtistAPI };
