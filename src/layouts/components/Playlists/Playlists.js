import './Playlists.scss';
import { useSelector } from 'react-redux';
import WeekChart from '@/components/WeekChart/WeekChart';
import { useState } from 'react';

function Playlists() {
    let playlist = useSelector((state) => state.song.playlist);
    let showPlaylist = useSelector((state) => state.song.showPlaylist);
    let recentSongs = useSelector((state) => state.song.recentSongs);

    let [isShowPlaylist, setIsShowPlaylist] = useState(true);
    let [isShowRecentSong, setIsShowRecentSong] = useState(false);

    let handleShow = (type) => {
        if (type === 'playlist' && !isShowPlaylist) {
            setIsShowPlaylist(true);
            setIsShowRecentSong(false);
        }
        if (type === 'recentSong' && !isShowRecentSong) {
            setIsShowPlaylist(false);
            setIsShowRecentSong(true);
        }
    };

    return (
        <div className={`playlist-wrapper ${showPlaylist ? 'show-playlist' : ''}`}>
            <div className="header-playlist">
                <div className="tab-bar">
                    <div className={`item ${isShowPlaylist && 'is-active'}`} onClick={() => handleShow('playlist')}>
                        Danh sách phát
                    </div>
                    <div className={`item ${isShowRecentSong && 'is-active'}`} onClick={() => handleShow('recentSong')}>
                        Nghe gần đây
                    </div>
                </div>
            </div>
            <div className="list-music">
                {isShowPlaylist && <WeekChart data={playlist} styleActive="primary" />}
                {isShowRecentSong && <WeekChart data={recentSongs} styleActive="primary" />}
            </div>
        </div>
    );
}

export default Playlists;
