import Header from '@/layouts/components/Header/Header';
import Sidebar from '@/layouts/components/Sidebar/Sidebar';
import Playlists from '../components/Playlists/Playlists';
import Footer from '../components/Footer/Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { apiGetOneUser } from '@/services/UserService';
import { useEffect } from 'react';
import { setUserData } from '@/features/Authen/AuthSlice';
import { setPlaylistSongFavorite } from '@/features/Song/SongSlice';
import { apiGetAllSongFavorite } from '@/services/SongFavorite';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    let dispatch = useDispatch();

    let userInfor = useSelector((state) => state.user.userInfor);
    let playlist = useSelector((state) => state.song.playlist);
    let isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    let isLoading = useSelector((state) => state.song.isLoading);

    useEffect(() => {
        let getUserInfor = async () => {
            let response = await apiGetOneUser(JSON.parse(userInfor));

            if (response.errCode === 0) {
                dispatch(setUserData(response.userInfor));
            }
        };
        if (isLoggedIn) {
            getUserInfor();
        }
    }, [userInfor, dispatch, isLoggedIn]);

    useEffect(() => {
        let getAllSongFavorite = async () => {
            let response = await apiGetAllSongFavorite(JSON.parse(userInfor));

            if (response.errCode === 0) {
                dispatch(setPlaylistSongFavorite(response.data));
            }
        };

        if (isLoggedIn) {
            getAllSongFavorite();
        }
    }, [userInfor, dispatch, isLoggedIn]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper-up')}>
                    <Sidebar />

                    <div className={cx('container-right', `${playlist.length === 0 && 'full'}`)}>
                        <Header />
                        <div className={cx('content')}>{children}</div>
                    </div>

                    <Playlists />
                </div>

                <div className={cx('wrapper-down')}>{playlist.length !== 0 && <Footer />}</div>
            </div>

            {isLoading && (
                <div className={cx('loading-container')}>
                    <ClimbingBoxLoader color={'#964B8A'} loading={true} size={25} />
                </div>
            )}
        </>
    );
}

export default DefaultLayout;
