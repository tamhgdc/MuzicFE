import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLogout } from '@/features/Authen/AuthSlice';

const cx = classNames.bind(styles);
function UserUntil() {
    let isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let handleLogin = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            dispatch(setLogout());
            navigate('/');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-item')}>
                <li onClick={handleLogin}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={cx('icon')} />
                    <span> {isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'} </span>
                </li>
            </ul>
        </div>
    );
}

export default UserUntil;
