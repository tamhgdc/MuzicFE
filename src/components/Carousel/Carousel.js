import classNames from 'classnames/bind';
import styles from './Carousel.modulo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Carousel({ title = '', playlistSlider, weekTop, type = 'primary', to = '/', showMore = false, artists = [] }) {
    let handleNumberFarorites = (number) => {
        let n = number / 1000;
        let view = n.toFixed(1);
        return view + 'K';
    };

    return (
        <>
            <div className={cx('carousel-text')}>
                <span className={cx('carousel-title')}>{type === 'primary' && title}</span>
                {showMore && (
                    <Link to={to} className={cx('all-top-100')}>
                        <span>Tất cả</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                )}
            </div>
            <div className={cx('carousel-container', { [type]: type })}>
                {playlistSlider &&
                    playlistSlider.map((item) => {
                        return (
                            <div className={cx('carousel-item', { [type]: type })} key={item.encodeId}>
                                <Link to={item.link} className={cx('img-item-wrapper')}>
                                    <img src={item.thumbnailM} alt={item.title} className={cx('img-item')} />
                                </Link>

                                <div className={cx('carousel-description')}>
                                    <span className={cx('main-text')}>{item.title}</span>
                                    <span className={cx('sub-text')}>{item.sortDescription || item.releaseDate}</span>
                                </div>
                            </div>
                        );
                    })}

                {weekTop &&
                    weekTop.map((item, index) => {
                        return (
                            <div className={cx('carousel-item', { [type]: type })} key={index}>
                                <Link to={item.link} className={cx('img-item-wrapper')}>
                                    <img src={item.banner} alt={item.country} className={cx('img-item')} />
                                </Link>
                            </div>
                        );
                    })}

                {artists &&
                    artists.map((item) => {
                        return (
                            <div className={cx('carousel-item', { [type]: type })} key={item.encodeId}>
                                <Link to={item.link} className={cx('img-item-wrapper', 'img-artist')}>
                                    <img src={item.thumbnailM} alt={item.name} className={cx('img-item')} />
                                </Link>

                                <div className={cx('carousel-description', 'artist')}>
                                    <span className={cx('main-text')}>{item.name}</span>
                                    <span className={cx('sub-text')}>{`${handleNumberFarorites(
                                        item.totalFollow,
                                    )} người theo dõi`}</span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Carousel;
