import './Singer.scss';
import MediaList from '@/components/MediaList/MediaList';

function ListSongs({ popularSong }) {
    return (
        <div className="artist-list-songs">
            <div className="songs-header">Danh sách bài hát</div>
            <MediaList data={popularSong.items} />
        </div>
    );
}

export default ListSongs;
