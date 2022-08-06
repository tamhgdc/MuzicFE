import axios from '../utils/httpRequest';

const apiAddSongFavorite = (dataSong) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `/favorite/addSongFavorite`,
                method: 'post',
                data: dataSong,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

const apiDeleteSongFavorite = (songId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `/favorite/deleteSongFavorite?songId=${songId}`,
                method: 'delete',
            });
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
};

const apiGetAllSongFavorite = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `/favorite/getAllSongFavorite`,
                method: 'get',
                headers: { 'access-token': token },
            });
            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
};

export { apiAddSongFavorite, apiDeleteSongFavorite, apiGetAllSongFavorite };
