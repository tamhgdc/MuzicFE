import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import styles from './ResultSearch.module.scss';
import _ from 'lodash';
import { updatePlaylist, updateIndex, updatePlay, updateLinkSong, addRecentSong } from '@/features/Song/SongSlice';
import { useDispatch } from 'react-redux';
import { getSong } from '@/services/SongService';

const cx = classNames.bind(styles);

function ResultSearch({ top = {}, songs = [], artists = [], playlists = [], type = '' }) {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let data = songs.length > 0 ? songs : playlists.length > 0 ? playlists : [];

    let handleClickItemSearch = async (item) => {
        if (type === 'top') {
            if (top.link.split('/')[1] === 'nghe-si') {
                navigate(top.link.split('/')[2]);
            } else {
                navigate(top.link);
            }
        } else if (type === 'playlists') {
            navigate(item.link);
        } else if (type === 'artists') {
            let link = item.link;
            if (item.link.split('/')[1] === 'nghe-si') {
                link = '/' + item.link.split('/')[2];
            }
            navigate(link);
        } else if (type === 'songs') {
            let res = await getSong(item.encodeId);
            if (res.err === 0) {
                dispatch(updateLinkSong(res.data));
            }

            dispatch(updatePlaylist([item]));
            dispatch(updateIndex(0));
            dispatch(updatePlay(true));
            dispatch(addRecentSong(item));
        }
    };

    return (
        <>
            {!_.isEmpty(top) && (
                <div className={cx('item-search')} onClick={handleClickItemSearch}>
                    <div className={cx('item-search-img')}>
                        <img src={top.thumbnail} alt={top.name} />
                    </div>

                    <div className={cx('item-search-desc')}>
                        <span className={cx('item-search-title')}>{top.name}</span>
                        <span className={cx('item-search-sub-title')}>{top.alias}</span>
                    </div>
                </div>
            )}

            {data.length > 0 &&
                data.map((item) => {
                    return (
                        <div className={cx('item-search')} onClick={() => handleClickItemSearch(item)}>
                            <div className={cx('item-search-img')}>
                                <img src={item.thumbnailM} alt={item.title} />
                            </div>

                            <div className={cx('item-search-desc')}>
                                <span className={cx('item-search-title')}>{item.title}</span>
                                <span className={cx('item-search-sub-title')}>{item.artistsNames}</span>
                            </div>
                        </div>
                    );
                })}

            {artists.length > 0 &&
                artists.map((item) => {
                    return (
                        <div className={cx('item-search')} onClick={() => handleClickItemSearch(item)}>
                            <div className={cx('item-search-img')}>
                                <img src={item.thumbnailM} alt={item.name} />
                            </div>

                            <div className={cx('item-search-desc')}>
                                <span className={cx('item-search-title')}>{item.name}</span>
                                <span className={cx('item-search-sub-title')}>{item.alias}</span>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

export default ResultSearch;
