import './Login.scss';
import { useEffect, useState } from 'react';
import { trim } from 'lodash';
import { apiLogin, apiRegister } from '@/services/AuthService';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setAccessToken } from '@/features/Authen/AuthSlice';
import { useNavigate } from 'react-router';

function Login() {
    let [userInfor, setUserInfor] = useState({
        isLogin: true,
        name: '',
        email: '',
        password: '',
    });

    let navigate = useNavigate();

    let dispatch = useDispatch();

    let handleOnChangeInput = (event, id) => {
        setUserInfor({
            ...userInfor,
            [id]: event.target.value,
        });
    };

    let validateFields = (arrField) => {
        return [/\S+@\S+\.\S+/.test(userInfor.email), arrField.find((item) => trim(userInfor[item]) === '')];
    };

    let handleSubmitLogin = async () => {
        let resultValidateFields = validateFields(['email', 'password']);
        if (!resultValidateFields[0]) {
            Swal.fire({
                title: 'Oops!',
                text: 'Email nhập vào không đúng!',
                icon: 'warning',
                confirmButtonText: 'Thử lại',
            });
        } else if (resultValidateFields[1]) {
            Swal.fire({
                title: 'Oops!',
                text: `Bạn chưa nhập mật khẩu, vui lòng nhập mật khẩu!`,
                icon: 'warning',
                confirmButtonText: 'Tôi biết rồi',
            });
        } else {
            let response = await apiLogin({
                email: userInfor.email,
                password: userInfor.password,
            });

            if (response && response.errCode === 0) {
                let userInfor = JSON.stringify(response.token);
                dispatch(setAccessToken(userInfor));
                dispatch(setIsLoggedIn());
                navigate(-1);
            } else {
                Swal.fire({
                    title: 'Oops!',
                    text: `${response.errMessage}`,
                    icon: 'warning',
                    confirmButtonText: 'Tôi biết rồi',
                });
            }
        }
    };

    let handleSubmitSignup = async () => {
        let resultValidateFields = validateFields(['email', 'password', 'name']);
        if (!resultValidateFields[0]) {
            Swal.fire({
                title: 'Oops!',
                text: 'Email nhập vào không đúng!',
                icon: 'warning',
                confirmButtonText: 'Thử lại',
            });
        } else if (resultValidateFields[1]) {
            Swal.fire({
                title: 'Oops!',
                text: `Bạn chưa nhập ${resultValidateFields[1]}`,
                icon: 'warning',
                confirmButtonText: 'Tôi biết rồi',
            });
        } else {
            let response = await apiRegister({
                email: userInfor.email,
                password: userInfor.password,
                fullName: userInfor.name,
            });

            if (response && response.errCode === 0) {
                Swal.fire({
                    title: 'Congratulation!',
                    text: `Đăng kí tài khoản thành công!`,
                    icon: 'success',
                    confirmButtonText: 'Đi tới đăng nhập nào!',
                });
                setUserInfor({
                    name: '',
                    email: '',
                    password: '',
                });
            } else {
                Swal.fire({
                    title: 'Oops!',
                    text: `${response.errMessage}`,
                    icon: 'warning',
                    confirmButtonText: 'Tôi biết rồi',
                });
            }
        }
    };

    let handleEnterSubmit = (event) => {
        if (event.code === 'Enter') {
            handleSubmitLogin();
        }
    };

    let handleToggleShowLogin = () => {
        const coverEl = document.querySelector('.cover-box');
        coverEl.classList.remove('start');
        let rectCover = coverEl.getBoundingClientRect();
        if (userInfor.isLogin) {
            coverEl.style.cssText = `
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
                transform: translateX(${rectCover.width}px) rotateZ(720deg);
            `;
            setUserInfor({
                isLogin: false,
                name: '',
                email: '',
                password: '',
            });
        } else {
            coverEl.style.cssText = `
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                transform: translateX(0) rotateZ(0);
            `;

            setUserInfor({
                isLogin: true,
                name: '',
                email: '',
                password: '',
            });
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="box-login">
                    <div className="login">
                        <h2 className="title">Đăng nhập</h2>
                        <div className="form-input">
                            <label htmlFor="email">Email: </label>
                            <input
                                onKeyUp={(event) => handleEnterSubmit(event)}
                                value={userInfor.email}
                                onChange={(event) => handleOnChangeInput(event, 'email')}
                                type="text"
                                id="email"
                                className="email"
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="password">Password: </label>
                            <input
                                onKeyUp={(event) => handleEnterSubmit(event)}
                                value={userInfor.password}
                                onChange={(event) => handleOnChangeInput(event, 'password')}
                                type="password"
                                id="password"
                                className="password"
                            />
                        </div>
                        <button onClick={() => handleSubmitLogin()} type="button" className="btn-submit">
                            Đăng nhập
                        </button>
                    </div>
                    <div className="sign-up">
                        <h2 className="title">Đăng ký tài khoản</h2>
                        <div className="form-input">
                            <label htmlFor="email2">Email: </label>
                            <input
                                value={userInfor.email}
                                onChange={(event) => handleOnChangeInput(event, 'email')}
                                type="text"
                                id="email2"
                                className="email"
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="password2">Password: </label>
                            <input
                                value={userInfor.password}
                                onChange={(event) => handleOnChangeInput(event, 'password')}
                                type="password"
                                id="password2"
                                className="password"
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="name">Họ và tên: </label>
                            <input
                                value={userInfor.name}
                                onChange={(event) => handleOnChangeInput(event, 'name')}
                                type="text"
                                id="name"
                                className="name"
                            />
                        </div>
                        <button type="button" onClick={() => handleSubmitSignup()} className="btn-submit">
                            Đăng ký
                        </button>
                    </div>
                    <div className="cover-box start">
                        <h2 className="title">{!userInfor.isLogin ? 'Hey, bro ~' : 'Hey, welcome back ~'}</h2>
                        <div className="welcome">
                            {!userInfor.isLogin ? 'Nếu bro chưa có tài khoản hãy đăng ký nào !' : 'Hãy đăng nhập nào !'}
                        </div>
                        <div onClick={() => handleToggleShowLogin()} className="btn-transform">
                            {!userInfor.isLogin ? 'Đăng ký' : 'Đăng nhập'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
