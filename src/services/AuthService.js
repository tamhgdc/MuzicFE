import axios from '../utils/httpRequest';

const apiRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `/auth/register`,
                method: 'post',
                data,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};
const apiLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `/auth/login`,
                method: 'post',
                data,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};
export { apiRegister, apiLogin };
