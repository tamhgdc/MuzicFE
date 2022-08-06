import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Album.modulo.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { getDetailAlbum } from '@/services/AlbumService';
import moment from 'moment';
import MediaList from '@/components/MediaList/MediaList';
import _ from 'lodash';
import {
    updatePlaylist,
    updateIndex,
    updatePlay,
    updateLinkSong,
    addRecentSong,
    updatePauseFromAlbum,
    updateIsPlaying,
} from '@/features/Song/SongSlice';
import { getSong } from '@/services/SongService';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

const cx = classNames.bind(styles);

function Album() {
    let [play, setPlay] = useState(false);
    let [firstTime, setFirstTime] = useState(true);
    let [data, setData] = useState({});
    let [total, setTotal] = useState('100');
    let [totalDuration, setTotalDuration] = useState('08:06:03');

    let params = useParams();
    let id = params.id.slice(0, 8);
    let thump_rotate = firstTime ? 'thump-rotate' : play ? 'thump-rotate-on' : 'thump-rotate-off';
    let timeUpdate = data ? new Date(data.contentLastUpdate * 1000) : '08/06/2003';
    timeUpdate = moment(timeUpdate).format('DD/MM/YYYY');
    let dispatch = useDispatch();
    let isPlaying = useSelector((state) => state.song.isPlaying);
    let playlist = useSelector((state) => state.song.playlist);

    useEffect(() => {
        const getDetailAlbums = async () => {
            dispatch(setIsLoading(true));
            let res = await getDetailAlbum(id);

            if (res.err === 0) {
                setData(res.data);
                dispatch(setIsLoading(false));
            }
        };

        getDetailAlbums();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);

    useEffect(() => {
        if (!_.isEmpty(data)) {
            let album = data.song.items;
            let checkEqual =
                album.length === playlist.length &&
                album.every((value, index) => value.encodeId === playlist[index].encodeId);

            if (checkEqual && isPlaying) {
                if (firstTime) {
                    setFirstTime(false);
                }
                setPlay(true);
            } else if (!isPlaying) {
                setPlay(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isPlaying, playlist]);

    useEffect(() => {
        let handleTotal = () => {
            if (data && data.song) {
                setTotal(data.song.total);
                setTotalDuration(handleTime(data.song.totalDuration));
            }
        };

        handleTotal();
    }, [data]);

    let handlePlay = async () => {
        if (data && data.song && data.song.items && !play) {
            let playlist = data.song.items;
            let newIndex = Math.floor(Math.random() * playlist.length);
            let res = await getSong(playlist[newIndex].encodeId);
            if (res.err === 0) {
                dispatch(updateLinkSong(res.data));
            }
            dispatch(updatePlaylist(playlist));
            dispatch(updateIndex(newIndex));
            dispatch(updatePlay(true));
            dispatch(addRecentSong(playlist[newIndex]));
            dispatch(updateIsPlaying(true));
        }

        if (play) {
            dispatch(updatePauseFromAlbum(true));
            dispatch(updateIsPlaying(false));
        }
        setPlay(!play);
    };

    let handleNumberFarorites = (number) => {
        let n = number / 1000;
        let view = n.toFixed(1);
        return view + 'K';
    };

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

    return (
        <>
            <div className={cx('wrapper-album')}>
                {!_.isEmpty(data) && (
                    <>
                        <div className={cx('content-left')}>
                            <div
                                className={cx('wrapper-img', {
                                    [thump_rotate]: thump_rotate,
                                })}
                                onClick={handlePlay}
                            >
                                <img src={data.thumbnailM} alt={data.title} className={cx('img-item-album')} />
                            </div>

                            <div className={cx('album-text-box')}>
                                <span className={cx('title-album')}> {data.title} </span>
                                <span>Cập nhật: {timeUpdate}</span>
                                <span>{data.artistsNames}</span>
                                <span>{handleNumberFarorites(data.like)} người yêu thích</span>
                            </div>

                            <div className={cx('action-album')}>
                                <div className={cx('desc-button')} onClick={handlePlay}>
                                    {play ? (
                                        <>
                                            <FontAwesomeIcon icon={faPause} />
                                            <span>Tạm dừng </span>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faPlay} />
                                            <span>Phát ngẫu nhiên</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={cx('content-right')}>
                            <div className={cx('description')}>
                                <span>Lời tựa:</span>
                                <span className={cx('main-desc')}>{data.sortDescription}</span>
                            </div>

                            <MediaList data={data && data.song && data.song.items} />

                            <div className={cx('sub-desc')}>
                                <span>{`${total} bài hát - Tổng thời gian: ${totalDuration}`}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Album;
