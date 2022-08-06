import { useRef, useState } from 'react';
import { apiSearchSong } from '@/services/SearchSongService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '@/components/Popper';
import ResultSearch from './ResultSearch';
import { useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import _ from 'lodash';
import { useNavigate } from 'react-router';

const cx = classNames.bind(styles);

function Search() {
    let [searchValue, setSearchValue] = useState('');
    let [searchResult, setSearchResult] = useState({});
    let [showSearch, setShowSearch] = useState(false);
    let [checkSearchResult, setCheckSearchResult] = useState(false);

    let navigate = useNavigate();
    let debounced = useDebounce(searchValue, 500);

    let inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult({});
            return;
        }

        let searchSong = async () => {
            let res = await apiSearchSong(debounced);
            if (res.err === 0) {
                setSearchResult(res.data);
                let check = !searchResult?.songs && !searchResult?.playlists && !searchResult?.artists;
                setCheckSearchResult(check);
            }
        };

        searchSong();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    let handleSearch = (e) => {
        let searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    let handleClear = () => {
        setSearchValue('');
        setSearchResult({});
        inputRef.current.focus();
    };

    let handleShowPageSearch = () => {
        if (checkSearchResult) {
            let linkPageSearch = `/tim-kiem/tat-ca?q=${searchValue}`;
            navigate(linkPageSearch);
        }
    };

    return (
        <>
            <Tippy
                interactive
                placement="bottom"
                visible={showSearch && !_.isEmpty(searchResult)}
                render={(attrs) => (
                    <div className={cx('search-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper type="search">
                            {searchResult?.top && (
                                <>
                                    <span className={cx('text-search')}>Kết quả phổ biến</span>
                                    <ResultSearch top={searchResult.top} type="top" />
                                </>
                            )}

                            {searchResult?.songs && (
                                <>
                                    <span className={cx('text-search')}>Bài hát gợi ý</span>
                                    <ResultSearch songs={searchResult?.songs} type="songs" />
                                </>
                            )}

                            {searchResult?.playlists && (
                                <>
                                    <span className={cx('text-search')}>Album gợi ý</span>
                                    <ResultSearch playlists={searchResult?.playlists} type="playlists" />
                                </>
                            )}

                            {searchResult?.artists && (
                                <>
                                    <span className={cx('text-search')}>Nghệ sĩ gợi ý</span>
                                    <ResultSearch artists={searchResult?.artists} type="artists" />
                                </>
                            )}

                            {!searchResult?.songs && !searchResult?.playlists && !searchResult?.artists && (
                                <span className={cx('text-search-empty')}>Không tìm được kết quả nào</span>
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowSearch(false)}
            >
                <div className={cx('search', `${showSearch && !_.isEmpty(searchResult) && 'active'}`)}>
                    <div className={cx('search-item-left')}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            onClick={handleShowPageSearch}
                            className={cx('icon-search')}
                        />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchValue}
                            placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                            onChange={handleSearch}
                            onFocus={() => setShowSearch(true)}
                        />
                    </div>

                    <div className={cx('search-item-right')}>
                        {searchValue !== '' && (
                            <FontAwesomeIcon icon={faXmark} className={cx('icon-close')} onClick={handleClear} />
                        )}
                    </div>
                </div>
            </Tippy>
        </>
    );
}

export default Search;
