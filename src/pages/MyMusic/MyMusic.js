import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import MediaList from '@/components/MediaList/MediaList';
import config from '@/config';

import './MyMusic.scss';
import { Link } from 'react-router-dom';

function MyMusic() {
    let playlistFavorite = useSelector((state) => state.song.playlistFavorite);
    let userData = useSelector((state) => state.user.userData);

    return (
        <div className="mymusic-wrapper">
            <div className="header__mymusic">
                <span className="header__text">Thư viện</span>
                <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
            </div>

            <div className="navbar__container">
                <ul className="navbar__list">
                    <li className="navbar__item active">Bài hát</li>
                    <li className="navbar__item">Album</li>
                </ul>
            </div>

            <div className="mymusic-media-list">
                <button className="btn-favorite">Yêu thích</button>

                {playlistFavorite.length > 0 ? (
                    <MediaList playlist={playlistFavorite} />
                ) : (
                    <div className="zm-empty">
                        <div className="icon-favorite-song"></div>
                        <span className="text">Chưa có bài hát yêu thích trong thư viện cá nhân</span>
                        <Link to={config.routes.newReleaseChart} className="discover">
                            Khám phá ngay
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyMusic;
