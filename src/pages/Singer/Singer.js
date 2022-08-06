import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArtistAPI } from '@/services/ArtistService';
import './Singer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import ArtistOverview from './ArtistOverview';
import ListSongs from './ListSongs';
import SingleEP from './SingleEP';
import Carousel from '@/components/Carousel/Carousel';
import { Link } from 'react-router-dom';
import ModalSinger from './ModalSinger';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

function Singer() {
    let [singerInfo, setSingerInfo] = useState({});
    let [popularSong, setPopularSong] = useState({});
    let [singleEP, setSingleEp] = useState({});
    let [album, setAlbum] = useState({});
    let [colection, setColection] = useState({});
    let [appear, setAppear] = useState({});
    let [isOpen, setIsOpen] = useState(false);

    let params = useParams();
    let dispatch = useDispatch();
    let artist = params.singerName;
    let tab = params.tab ? params.tab : '';
    let NavbarList = [
        { value: 'Tổng quan', option: '', to: `/${artist}` },
        { value: 'Bài hát', option: 'bai-hat', to: `/${artist}/bai-hat` },
        { value: 'Single & EP', option: 'single', to: `/${artist}/single` },
        { value: 'Album', option: 'album', to: `/${artist}/album` },
        { value: 'MV', option: 'video', to: `/${artist}/video` },
    ];

    useEffect(() => {
        let getArtist = async () => {
            dispatch(setIsLoading(true));
            let res = await getArtistAPI(artist);

            if (res.err === 0) {
                setSingerInfo(res.data);
                setPopularSong(res.data.sections[0]);
                setSingleEp(res.data.sections[1]);
                setAlbum(res.data.sections[2]);
                setColection(res.data.sections[4]);
                setAppear(res.data.sections[5]);
                dispatch(setIsLoading(false));
            }
        };

        getArtist();
    }, [artist, dispatch]);

    let handleNumberFarorites = (number) => {
        let n = number / 1000;
        let view = n.toFixed(1);
        return view + 'K';
    };

    let handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="wrapper-artist">
                {!_.isEmpty(singerInfo) && (
                    <div className="artist-header">
                        <div className="artist-content-left">
                            <span className="name-title">{singerInfo.name}</span>
                            <div className="sub-title">
                                {singerInfo.sortBiography}
                                <span className="more-infor" onClick={() => setIsOpen(true)}>
                                    Xem thêm
                                </span>
                            </div>
                            <div className="actions">
                                <button>
                                    <FontAwesomeIcon icon={faPlay} />
                                    <span>Phát nhạc</span>
                                </button>
                                <button>{`Quan tâm - ${handleNumberFarorites(singerInfo.follow)}`}</button>
                            </div>

                            <div className="awards">
                                <img
                                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.34/static/media/zing-choice.3af580a0.svg"
                                    alt="awards"
                                    className="ic-zing-choice"
                                />
                            </div>
                        </div>

                        <div className="artist-content-right">
                            <img src={singerInfo.thumbnailM} alt={singerInfo.name} className="img-singer" />
                        </div>
                    </div>
                )}

                <div className="artist-body">
                    <div className="artist-navbar">
                        <ul className="navbar-list">
                            {NavbarList.map((item, index) => {
                                let nameClass = '';
                                if (tab === item.option) {
                                    nameClass = 'is-active';
                                }

                                return (
                                    <Link to={item.to} className={`navbar-item ${nameClass}`} key={index}>
                                        {item.value}
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="artist-container">
                        {tab === '' &&
                            !_.isEmpty(popularSong) &&
                            !_.isEmpty(singleEP) &&
                            !_.isEmpty(album) &&
                            !_.isEmpty(colection) &&
                            !_.isEmpty(appear) && (
                                <ArtistOverview
                                    popularSong={popularSong}
                                    singleEP={singleEP}
                                    album={album}
                                    colection={colection}
                                    appear={appear}
                                />
                            )}

                        {tab === 'bai-hat' && !_.isEmpty(popularSong) && <ListSongs popularSong={popularSong} />}

                        {tab === 'single' && !_.isEmpty(singleEP) && <SingleEP singleEP={singleEP} />}

                        {tab === 'album' && !_.isEmpty(album) && (
                            <Carousel playlistSlider={album.items} title={album.title} />
                        )}

                        {tab === 'video' && (
                            <div className="artist-mv">
                                Chưa có chức năng này chúng tôi sẽ cố gắng hoàn thiện sớm nhất có thể
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!_.isEmpty(singerInfo) && (
                <ModalSinger singerInfo={singerInfo} isOpen={isOpen} handleClose={handleClose} />
            )}
        </>
    );
}

export default Singer;
