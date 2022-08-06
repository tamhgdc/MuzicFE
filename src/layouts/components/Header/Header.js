import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faGear } from '@fortawesome/free-solid-svg-icons';
import AvatarUser from '@/assets/images/Avatar-user.jpg';
import AvatarDefault from '@/assets/images/Avatar-default.jpg';
import { Wrapper as PopperWrapper } from '@/components/Popper';
import Setting from './Setting';
import UserUntil from './UserUntil';
import { useSelector } from 'react-redux';
import Search from '../Search/Search';

const cx = classNames.bind(styles);

function Header() {
    let handleNavigate = (type) => {
        if (type === 'back' && window.location.pathname !== '/') {
            window.history.back();
        }
        if (type === 'forward') {
            window.history.forward();
        }
    };
    let isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('nav-left')}>
                    <div className={cx('button-left')}>
                        <button
                            className={cx('btn', `${window.location.pathname === '/' && 'disabled'}`)}
                            onClick={() => handleNavigate('back')}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className={cx('icon-arrow-left')} />
                        </button>
                        <button
                            className={cx('btn', `${window.history.length === 2 && 'disabled'}`)}
                            onClick={() => handleNavigate('forward')}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                    <Search />
                </div>

                <div className={cx('nav-right')}>
                    <Tippy
                        interactive={true}
                        placement="bottom-end"
                        hideOnClick={false}
                        delay={[0, 700]}
                        render={(attrs) => (
                            <div className={cx('button-setting')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <Setting />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <button className={cx('btn')}>
                            <FontAwesomeIcon icon={faGear} className={cx('icon-setting')} />
                        </button>
                    </Tippy>
                    <Tippy
                        interactive={true}
                        placement="bottom-end"
                        hideOnClick={false}
                        render={(attrs) => (
                            <div className={cx('button-setting')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <UserUntil />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <button className={cx('btn')}>
                            <img src={isLoggedIn ? AvatarUser : AvatarDefault} alt="" className={cx('avatar-user')} />
                        </button>
                    </Tippy>
                </div>
            </header>
        </>
    );
}

export default Header;
