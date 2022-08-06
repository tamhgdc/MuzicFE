import './Singer.scss';
import Carousel from '@/components/Carousel/Carousel';
import MediaList from '@/components/MediaList/MediaList';
import { useEffect, useRef } from 'react';

function ArtistOverview({ popularSong, singleEP, album, colection, appear }) {
    let idInterval = useRef();

    useEffect(() => {
        let handleEffectImg = () => {
            const imgEls = document.querySelectorAll('.item-img');
            let currentIndex = imgEls.length - 1;
            idInterval.current = setInterval(() => {
                for (let i = 0; i < imgEls.length; i++) {
                    if (i === currentIndex) {
                        if (document.querySelector('.first'))
                            document.querySelector('.first').classList.remove('first');
                        if (document.querySelector('.second'))
                            document.querySelector('.second').classList.remove('second');
                        if (document.querySelector('.three'))
                            document.querySelector('.three').classList.remove('three');
                        if (currentIndex < 0) {
                            imgEls[imgEls.length - 1].classList.add('first');
                        } else {
                            imgEls[i].classList.add('first');
                        }
                        if (currentIndex - 1 < 0) {
                            imgEls[imgEls.length - 1].classList.add('second');
                        } else {
                            imgEls[i - 1].classList.add('second');
                        }
                        if (currentIndex - 2 < 0) {
                            imgEls[imgEls.length - 2].classList.add('three');
                        } else {
                            imgEls[i - 2].classList.add('three');
                        }
                    }
                }
                if (currentIndex === 0) {
                    currentIndex = imgEls.length - 1;
                } else {
                    currentIndex -= 1;
                }
            }, 2000);
        };

        handleEffectImg();

        return () => {
            clearInterval(idInterval.current);
        };
    }, []);

    return (
        <div className="artist-overview">
            <div className="popular-song">
                <div className="section-header">{popularSong.title}</div>

                <div className="popular-content">
                    <div className="img-popular-box">
                        {popularSong.items.slice(0, 11).map((item, index) => {
                            let nameClass = '';
                            if (index === 0) {
                                nameClass = 'first';
                            } else if (index === 1) {
                                nameClass = 'second';
                            } else if (index === 2) {
                                nameClass = 'three';
                            }
                            return (
                                <img
                                    src={item.thumbnailM}
                                    key={item.encodeId}
                                    alt={item.title}
                                    className={`item-img ${nameClass}`}
                                />
                            );
                        })}
                    </div>

                    <div className="popular-media-list">
                        <MediaList data={popularSong.items} showHeader={false} />
                    </div>
                </div>
            </div>

            <Carousel
                showMore={true}
                playlistSlider={singleEP.items.slice(0, 5)}
                title={singleEP.title}
                to={singleEP.link}
            />

            <Carousel showMore={true} playlistSlider={album.items.slice(0, 5)} title={album.title} to={album.link} />

            <Carousel playlistSlider={colection.items.slice(0, 5)} title={colection.title} />

            <Carousel playlistSlider={appear.items.slice(0, 5)} title={appear.title} />
        </div>
    );
}

export default ArtistOverview;
