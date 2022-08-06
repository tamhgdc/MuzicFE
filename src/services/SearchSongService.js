import axios from '../utils/httpRequest';

const apiSearchSong = (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `/search/searchSong?search=${search}`,
                method: 'get',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

export { apiSearchSong };
