import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { apiSearchSong } from '@/services/SearchSongService';
import './PageSearch.scss';
import MediaList from '@/components/MediaList/MediaList';
import Carousel from '@/components/Carousel/Carousel';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

function PageSearch() {
    let [searchParams, setSearchParams] = useSearchParams();
    let dispatch = useDispatch();

    let [searchResult, setSearchResult] = useState({});

    let question = searchParams.get('q');

    useEffect(() => {
        if (!question.trim()) {
            setSearchResult({});
            return;
        }

        let searchSong = async () => {
            dispatch(setIsLoading(true));

            let res = await apiSearchSong(question);
            if (res.err === 0) {
                setSearchResult(res.data);

                dispatch(setIsLoading(false));
            }
        };

        searchSong();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question]);

    return (
        <>
            <div className="page-search-wrapper">
                <div className="page-search-header">
                    <p>Kết quả tìm kiếm</p>
                </div>

                <div className="page-search-content">
                    {searchResult?.songs && (
                        <>
                            <p className="title-content">Bài hát</p>
                            <MediaList data={searchResult.songs} />
                        </>
                    )}

                    {searchResult?.playlists && (
                        <Carousel title="Playlist/Album" playlistSlider={searchResult.playlists} />
                    )}

                    {searchResult?.artists && <Carousel title="Nghệ Sĩ/OA" artists={searchResult.artists} />}
                </div>
            </div>
        </>
    );
}

export default PageSearch;
