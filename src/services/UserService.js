import axios from '../utils/httpRequest';

const apiGetOneUser = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `/user/get-one-user`,
                method: 'get',
                headers: {
                    'access-token': token,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};
export { apiGetOneUser };
