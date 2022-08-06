import classNames from 'classnames/bind';
import styles from './Home.mudulo.scss';
import { useEffect, useState } from 'react';

import Gallery from '@/components/Gallery/Gallery';
import Carousel from '@/components/Carousel/Carousel';
import LineChart from '@/components/Chart/LineChart';
import { getHomePage } from '@/services/HomeService';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';
import _ from 'lodash';

const cx = classNames.bind(styles);

function Home() {
    let [bannerSlider, setBannerSlider] = useState([]);
    let [playlistSlider, setPlaylistSlider] = useState([]);
    let [weekTop, setWeekTop] = useState([]);
    let [singers, setSingers] = useState([]);
    let [top100, setTop100] = useState({});
    let [chart, setChart] = useState({});

    let dispatch = useDispatch();

    useEffect(() => {
        const getAllHomePage = async () => {
            dispatch(setIsLoading(true));
            let homePage1 = await getHomePage(1);
            dispatch(setIsLoading(false));
            let homePage2 = await getHomePage(2);
            let homePage3 = await getHomePage(3);

            if (homePage1.err === 0 && homePage2.err === 0 && homePage3.err === 0) {
                let HomePageItems = [...homePage1.data.items, ...homePage2.data.items, ...homePage3.data.items];
                let arrBanner = [];
                let arrPlaylist = [];
                let itemChart = {};
                let arrWeekTop = [];
                let arrSinger = [];
                let itemTop100 = {};
                HomePageItems.forEach((item) => {
                    if (item.sectionType === 'banner') {
                        arrBanner = item.items;
                    }
                    if (item.sectionType === 'playlist' && item.title !== 'Top 100') {
                        arrPlaylist.push(item);
                    }
                    if (item.sectionType === 'RTChart') {
                        itemChart = { ...item };
                    }
                    if (item.sectionType === 'weekChart') {
                        arrWeekTop = item.items;
                    }
                    if (item.sectionType === 'artistSpotlight') {
                        arrSinger = item.items;
                    }
                    if (item.sectionType === 'playlist' && item.title === 'Top 100') {
                        itemTop100 = { ...item };
                    }
                });
                setBannerSlider(arrBanner);
                setPlaylistSlider(arrPlaylist);
                setChart(itemChart);
                setWeekTop(arrWeekTop);
                setSingers(arrSinger);
                setTop100(itemTop100);
            }
        };

        getAllHomePage();
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            <Gallery bannerSlider={bannerSlider} />
            {playlistSlider &&
                playlistSlider.map((item) => {
                    return <Carousel title={item.title} playlistSlider={item.items} />;
                })}
            {!_.isEmpty(chart) && chart.chart && <LineChart chart={chart.chart} items={chart.items} />}

            {weekTop && <Carousel type="large" weekTop={weekTop} />}
            {singers && <Gallery type="rounded" singers={singers} />}
            {top100 && (
                <Carousel
                    title={top100.title}
                    to={top100.link}
                    showMore={true}
                    playlistSlider={top100.items && top100.items.slice(0, 5)}
                />
            )}
        </div>
    );
}

export default Home;
