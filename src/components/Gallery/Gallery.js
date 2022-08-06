import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Gallery.modulo.scss';
import { getSongInfo, getSong } from '@/services/SongService';
import { useDispatch } from 'react-redux';
import { updatePlaylist, updateIndex, updatePlay, updateLinkSong } from '@/features/Song/SongSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Gallery({ bannerSlider, singers = [], type = 'primary' }) {
    let show = type === 'primary' ? 3 : 7;
    let dispatch = useDispatch();
    let navigate = useNavigate();

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: show,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    let handleNumberFarorites = (number) => {
        let n = number / 1000;
        let view = n.toFixed(1);
        return view + 'K';
    };

    let handlePlayBanner = async (item) => {
        let arr = item.link.split('/');
        if (arr[1] === 'bai-hat') {
            let songInfo = await getSongInfo(item.encodeId);

            if (songInfo.err === 0) {
                let res = await getSong(songInfo.data.encodeId);
                dispatch(updateLinkSong(res.data));
                dispatch(updatePlaylist([songInfo.data]));
                dispatch(updateIndex(0));
                dispatch(updatePlay(true));
            }
        }
        if (arr[1] === 'album' || arr[1] === 'playlist') {
            navigate(item.link);
        }
        if (arr[1] === 'liveradio') {
            alert('Chức năng phát trực tiếp hiện tại đang được phát triển thêm. Mong bạn thông cảm');
        }
    };

    let handleToSinger = (item) => {
        if (item.link.split('/')[1] === 'nghe-si') {
            navigate(item.link.split('/')[2]);
        } else {
            navigate(item.link);
        }
    };

    return (
        <>
            <Slider {...settings} className={cx('slide-banner', { [type]: type })}>
                {bannerSlider &&
                    bannerSlider.map((item, index) => {
                        return (
                            <div className={cx('gallery-wrapper')} key={index}>
                                <div className={cx('gallery-item')} onClick={() => handlePlayBanner(item)}>
                                    <img src={item.banner} alt="" className={cx('img-gallery-item')} />
                                </div>
                            </div>
                        );
                    })}

                {singers.length > 0 &&
                    singers.map((item) => {
                        return (
                            <div className={cx('gallery-wrapper')} key={item.encodeId}>
                                <div
                                    className={cx('gallery-item')}
                                    onClick={() => {
                                        handleToSinger(item);
                                    }}
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className={cx('img-gallery-item', { [type]: type })}
                                    />
                                </div>

                                <div className={cx('infor-singer')} to={item.name}>
                                    <span className={cx('name-singer')}>{item.name}</span>
                                    <span className={cx('number-favorites')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon-tym')} />
                                        {item.totalFollow ? handleNumberFarorites(item.totalFollow) : 0}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </Slider>
        </>
    );
}

export default Gallery;
