import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Footer.scss';
import {
    faCirclePause,
    faList,
    faVolumeHigh,
    faVolumeXmark,
    faBackwardStep,
    faForwardStep,
    faRepeat,
    faShuffle,
    faCirclePlay,
    faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import HandleEvent from './HandleEvent';
import { useEffect, useState } from 'react';
import {
    updateIndex,
    updatePlay,
    updateIsPlaying,
    updatePauseFromAlbum,
    updateLinkSong,
    setShowPlaylist,
} from '@/features/Song/SongSlice';
import { getSong } from '@/services/SongService';
import { Slider } from 'react-semantic-ui-range';
import { addSongFavorite, removeSongFavorite, setIsRandom, setIsRepeat } from '@/features/Song/SongSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { apiAddSongFavorite, apiDeleteSongFavorite } from '@/services/SongFavorite';
import Swal from 'sweetalert2';

const $ = document.querySelector.bind(document);

function Footer() {
    let [isPlay, setIsPlay] = useState(false);
    let [linkSong, setLinkSong] = useState({});
    let [progressPercent, setProgressPercent] = useState(1);
    let [volume, setVolume] = useState(10);
    let [oldVolume, setOldVolume] = useState(10);
    let [isSound, setIsSound] = useState(true);
    let [isSongFavorite, setIsSongFavorite] = useState(false);

    let dispatch = useDispatch();
    let playlist = useSelector((state) => state.song.playlist);
    let index = useSelector((state) => state.song.index);
    let playMusic = useSelector((state) => state.song.play);
    let pauseFromAlbum = useSelector((state) => state.song.pauseFromAlbum);
    let link = useSelector((state) => state.song.linkSong);
    let dataSong = playlist[index];
    let currentTime = $('.time-left');
    let audio = $('#audio');
    let showPlaylist = useSelector((state) => state.song.showPlaylist);
    let isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    let navigate = useNavigate();
    let isRandom = useSelector((state) => state.song.isRandom);
    let isRepeat = useSelector((state) => state.song.isRepeat);

    useEffect(() => {
        if (!_.isEmpty(link)) {
            setLinkSong(link);
        }
    }, [link]);

    let handlePlayMusic = () => {
        if (playMusic && !_.isEmpty(linkSong)) {
            audio.currentTime = 0;
            HandleEvent.play(link, audio, false, audio.currentTime);
            dispatch(updatePlay(false));
            setIsPlay(true);
        }
    };

    handlePlayMusic();

    useEffect(() => {
        let handlePlayFromAlbum = () => {
            if (pauseFromAlbum && !_.isEmpty(linkSong) && !_.isEmpty(audio)) {
                HandleEvent.play(link, audio, true, audio.currentTime);
                dispatch(updatePauseFromAlbum(false));
                dispatch(updateIsPlaying(false));
                setIsPlay(false);
            }
        };

        handlePlayFromAlbum();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pauseFromAlbum]);

    let handleClick = async (type) => {
        if (type === 'play') {
            HandleEvent.play(linkSong, audio, isPlay, audio.currentTime);
            if (!isPlay) {
                dispatch(updateIsPlaying(true));
            } else if (isPlay) {
                dispatch(updateIsPlaying(false));
            }
            setIsPlay(!isPlay);
        } else if (type === 'next') {
            if (!isRandom) {
                if (index === playlist.length - 1) {
                    index = 0;
                } else {
                    index += 1;
                }
            } else {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * playlist.length);
                } while (index === newIndex);
                index = newIndex;
            }
            let res = await getSong(playlist[index].encodeId);
            if (res.err === 0) {
                dispatch(updateLinkSong(res.data));
            }
            dispatch(updateIndex(index));
            dispatch(updatePlay(true));
        } else if (type === 'prev') {
            if (!isRandom) {
                if (index === 0) {
                    index = playlist.length - 1;
                } else {
                    index -= 1;
                }
            } else {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * playlist.length);
                } while (index === newIndex);
                index = newIndex;
            }
            let res = await getSong(playlist[index].encodeId);
            if (res.err === 0) {
                dispatch(updateLinkSong(res.data));
            }
            dispatch(updateIndex(index));
            dispatch(updatePlay(true));
        } else if (type === 'random') {
            dispatch(setIsRandom());
        } else if (type === 'repeat') {
            dispatch(setIsRepeat());
        }
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

    let handleOnTimeUpdate = () => {
        if (audio.duration) {
            currentTime.innerText = handleTime(Math.floor(audio.currentTime));
            setProgressPercent(((audio.currentTime / audio.duration) * 100).toFixed(4));
        }
    };

    let handleSound = () => {
        if (isSound) {
            audio.volume = 0;
            setIsSound(false);
            setOldVolume(volume);
            setVolume(0);
        } else {
            audio.volume = oldVolume / 10;
            setIsSound(true);
            setVolume(oldVolume);
        }
    };

    let handleOnEnded = () => {
        audio.currentTime = 0;
        if (isRepeat) {
            audio.play();
        } else {
            handleClick('next');
        }
    };

    const settingsProgress = {
        start: 1,
        min: 0,
        max: 100,
        step: 1,

        onChange: (value) => {
            if (Math.abs(value - progressPercent) > 2) {
                let seekTime = (audio.duration / 100) * value;
                audio.currentTime = seekTime;
            }
        },
    };

    const settingsVolume = {
        start: 10,
        min: 0,
        max: 10,
        step: 1,

        onChange: (value) => {
            setVolume(value);
            audio.volume = value / 10;
        },
    };

    let handleSongFavorite = async () => {
        if (isSongFavorite) {
            await apiDeleteSongFavorite(dataSong.encodeId);
            dispatch(removeSongFavorite(dataSong.encodeId));
            toast.error('Đã xóa bài hát khỏi thư viện');
            setIsSongFavorite(!isSongFavorite);
        } else {
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
                    encodeId: dataSong.encodeId,
                    userId: dataSong.id,
                    thumbnailM: dataSong.thumbnailM,
                    artistsNames: dataSong.artistsNames,
                    title: dataSong.title,
                    albumTitle: dataSong.album.title || '',
                    duration: dataSong.duration,
                });
                dispatch(addSongFavorite(dataSong));
                toast.success('Đã thêm bài hát vào thư viện');
                setIsSongFavorite(!isSongFavorite);
            }
        }
    };

    let handleShowPlaylist = () => {
        dispatch(setShowPlaylist());
    };

    return (
        <>
            <div className="footer">
                <div className="content-left">
                    {!_.isEmpty(dataSong) && (
                        <>
                            <img src={dataSong.thumbnailM} alt={dataSong.title} className="avatar-song" />
                            <div className="description">
                                <div className="song-name">{dataSong.title}</div>

                                <div className="author">{dataSong.artistsNames}</div>
                            </div>
                        </>
                    )}
                    <div className="icon-music">
                        <Tippy content={isSongFavorite ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện'}>
                            <button
                                className={isSongFavorite ? 'btn btn-active' : 'btn'}
                                onClick={() => handleSongFavorite()}
                            >
                                <FontAwesomeIcon icon={isSongFavorite ? faHeartSolid : faHeart} />
                            </button>
                        </Tippy>
                    </div>
                </div>
                <div className="content-center">
                    <div className="control-center">
                        <Tippy content={isRandom ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}>
                            <button
                                className={`btn btn-random ${isRandom && 'btn-active'}`}
                                onClick={() => handleClick('random')}
                            >
                                <FontAwesomeIcon icon={faShuffle} />
                            </button>
                        </Tippy>
                        <button className="btn btn-prev" onClick={() => handleClick('prev')}>
                            <FontAwesomeIcon icon={faBackwardStep} />
                        </button>
                        <button className="btn btn-center" onClick={() => handleClick('play')}>
                            {isPlay ? (
                                <FontAwesomeIcon icon={faCirclePause} />
                            ) : (
                                <FontAwesomeIcon icon={faCirclePlay} />
                            )}
                        </button>
                        <button className="btn btn-next" onClick={() => handleClick('next')}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </button>
                        <Tippy content={isRepeat ? 'Tắt phát lại một bài' : 'Bật phát lại một bài'}>
                            <button
                                className={`btn btn-repeat ${isRepeat && 'btn-active'}`}
                                onClick={() => handleClick('repeat')}
                            >
                                <FontAwesomeIcon icon={faRepeat} />
                            </button>
                        </Tippy>

                        <audio id="audio" src="" onTimeUpdate={handleOnTimeUpdate} onEnded={handleOnEnded}></audio>
                    </div>

                    <div className="time-control">
                        <span className="time-left">00:00</span>
                        <div className="progress-bar">
                            <Slider
                                style={{ width: '480px' }}
                                inverted={false}
                                settings={settingsProgress}
                                className="progress"
                                value={progressPercent}
                            />
                        </div>
                        <span className="time-right">{handleTime(dataSong.duration)}</span>
                    </div>
                </div>
                <div className="content-right">
                    <div className="sound-control">
                        <button className="btn" onClick={handleSound}>
                            {isSound ? (
                                <FontAwesomeIcon icon={faVolumeHigh} className="icon-volume" />
                            ) : (
                                <FontAwesomeIcon icon={faVolumeXmark} className="icon-volume" />
                            )}
                        </button>
                        <div className="progress-bar">
                            <Slider
                                style={{ width: '70px' }}
                                inverted={false}
                                settings={settingsVolume}
                                className="progress"
                                value={volume}
                            />
                        </div>
                    </div>

                    <div className="list-music">
                        <Tippy content="Danh sách phát">
                            <button className={`btn ${showPlaylist ? 'btn-active' : ''}`} onClick={handleShowPlaylist}>
                                <FontAwesomeIcon icon={faList} />
                            </button>
                        </Tippy>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Footer);
