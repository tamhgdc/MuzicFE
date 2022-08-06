import classNames from 'classnames/bind';
import styles from './MediaList.modulo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faList, faMinus, faMusic, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    updatePlaylist,
    updateIndex,
    updatePlay,
    updateLinkSong,
    addSongFavorite,
    removeSongFavorite,
    addRecentSong,
} from '@/features/Song/SongSlice';
import { getSong } from '@/services/SongService';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { toast } from 'react-toastify';
import { apiAddSongFavorite, apiDeleteSongFavorite } from '@/services/SongFavorite';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function MediaList({ data = [], playlist = [], type = 'music', showHeader = true }) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let playlistFavorite = useSelector((state) => state.song.playlistFavorite);
    let index = useSelector((state) => state.song.index);
    let playlistSong = useSelector((state) => state.song.playlist);
    let dataSong = playlistSong[index];
    let userData = useSelector((state) => state.user.userData);
    let isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    let handleTime = (secondsTotal) => {
        let hour = Math.floor(secondsTotal / 3600) === 0 ? '' : Math.floor(secondsTotal / 3600) + ':';
        let minutesTotal = secondsTotal % 3600;
        let minutes = Math.floor(minutesTotal / 60) === 0 ? '00:' : Math.floor(minutesTotal / 60) + ':';
        let seconds = minutesTotal % 60;
        if (('' + seconds).length === 1) {
            seconds = '0' + seconds;
        }
        if (('' + minutes).length === 2) {
            minutes = '0' + minutes;
        }

        return `${hour}${minutes}${seconds}`;
    };

    let handlePlaySong = async (item, index) => {
        let res = await getSong(item.encodeId);
        if (res.err === 0) {
            dispatch(updateLinkSong(res.data));
        }

        dispatch(updatePlaylist(data));
        dispatch(updateIndex(index));
        dispatch(updatePlay(true));
        dispatch(addRecentSong(item));
    };

    let handleAddSongFavorite = async (item) => {
        if (!isLoggedIn) {
            Swal.fire({
                title: 'Hey, bro!',
                text: `Bạn hãy đăng nhập để sử dụng được chức năng này ~`,
                icon: 'warning',
                confirmButtonText: 'Đi tới đăng nhập',
                cancelButtonText: `Không cần`,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        } else {
            await apiAddSongFavorite({
                encodeId: item.encodeId,
                userId: userData.id,
                thumbnailM: item.thumbnailM,
                artistsNames: item.artistsNames,
                title: item.title,
                albumTitle: item.album.title || '',
                duration: item.duration,
            });
            dispatch(addSongFavorite(item));
            toast.success('Đã thêm bài hát vào thư viện');
        }
    };

    let handleRemoveSongFavorite = async (item) => {
        await apiDeleteSongFavorite(item.encodeId);
        dispatch(removeSongFavorite(item.encodeId));
        toast.error('Đã xóa bài hát khỏi thư viện');
    };
    return (
        <div className={cx('media-list')}>
            {showHeader && (
                <div className={cx('select-header')}>
                    <div className={cx('media-left')}>
                        <FontAwesomeIcon icon={faList} />
                        <span>Bài hát</span>
                    </div>
                    <div className={cx('media-content')}>
                        <span>Album</span>
                    </div>
                    <div className={cx('media-right')}>
                        <p>Thời gian</p>
                    </div>
                </div>
            )}
            <div>
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        let albumTitle = '';
                        let nameClass = 'number-rank';
                        let isActive = '';

                        if (item.album && item.album.title) {
                            albumTitle = item.album.title;
                        }

                        if (index < 3) {
                            nameClass = `number-rank-${index + 1}`;
                        }

                        if (!_.isEmpty(dataSong) && dataSong.encodeId && item.encodeId === dataSong.encodeId) {
                            isActive = 'is-active';
                        }

                        return (
                            <div className={`select-item ${isActive}`}>
                                <div className={cx('media-left')} onClick={() => handlePlaySong(item, index)}>
                                    {type === 'music' ? (
                                        <FontAwesomeIcon icon={faMusic} />
                                    ) : (
                                        <p className={cx(`${nameClass}`)}>{index + 1}</p>
                                    )}
                                    {type === 'rank' && <FontAwesomeIcon icon={faMinus} className={cx('icon-sort')} />}
                                    <div className={cx('img-song-media')}>
                                        <img src={item.thumbnailM} alt={item.title} className={cx('img-song')} />
                                    </div>
                                    <div className={cx('media-text')}>
                                        <span className={cx('title-media')}>{item.title}</span>
                                        <span>{item.artistsNames}</span>
                                    </div>
                                </div>
                                <div className={cx('media-content')} onClick={() => handlePlaySong(item, index)}>
                                    <span className={cx('desc-media')}>{albumTitle}</span>
                                </div>
                                <div className={cx('media-right')}>
                                    <div className="media-right-item">
                                        <div className={cx('hover-item')}>
                                            {!playlistFavorite?.some((i) => i.encodeId === item.encodeId) ? (
                                                <Tippy content="Thêm vào thư viện">
                                                    <button
                                                        className={cx('btn')}
                                                        onClick={() => handleAddSongFavorite(item, index)}
                                                    >
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </button>
                                                </Tippy>
                                            ) : (
                                                <Tippy content="Xóa khỏi thư viện">
                                                    <button
                                                        className={cx('btn', `active`)}
                                                        onClick={() => handleRemoveSongFavorite(item, index)}
                                                    >
                                                        <FontAwesomeIcon icon={faHeartSolid} />
                                                    </button>
                                                </Tippy>
                                            )}
                                        </div>
                                        <div className={cx('time-item')}>
                                            <span>{handleTime(item.duration)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                {playlist &&
                    playlist.length > 0 &&
                    playlist.map((item, index) => {
                        let albumTitle = '';

                        if (item.album && item.album.title) {
                            albumTitle = item.album.title;
                        }

                        let nameClass = 'number-rank';
                        if (index < 3) {
                            nameClass = `number-rank-${index + 1}`;
                        }

                        return (
                            <div className={cx('select-item')}>
                                <div className={cx('media-left')} onClick={() => handlePlaySong(item, index)}>
                                    {type === 'music' ? (
                                        <FontAwesomeIcon icon={faMusic} />
                                    ) : (
                                        <p className={cx(`${nameClass}`)}>{index + 1}</p>
                                    )}
                                    {type === 'rank' && <FontAwesomeIcon icon={faMinus} className={cx('icon-sort')} />}
                                    <div className={cx('img-song-media')}>
                                        <img src={item.thumbnailM} alt={item.title} className={cx('img-song')} />
                                    </div>
                                    <div className={cx('media-text')}>
                                        <span className={cx('title-media')}>{item.title}</span>
                                        <span>{item.artistsNames}</span>
                                    </div>
                                </div>
                                <div className={cx('media-content')} onClick={() => handlePlaySong(item, index)}>
                                    <span className={cx('desc-media')}>{albumTitle}</span>
                                </div>
                                <div className={cx('media-right')}>
                                    <div className="media-right-item">
                                        <div className={cx('hover-item')}>
                                            <Tippy content="Xóa khỏi thư viện">
                                                <button
                                                    className={cx('btn', `active`)}
                                                    onClick={() => handleRemoveSongFavorite(item, index)}
                                                >
                                                    <FontAwesomeIcon icon={faHeartSolid} />
                                                </button>
                                            </Tippy>
                                        </div>
                                        <div className={cx('time-item')}>
                                            <span>{handleTime(item.duration)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default MediaList;
