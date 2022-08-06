import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ZingChart.modulo.scss';
import { getChartHomeAPI } from '@/services/ChartService';
import MediaList from '@/components/MediaList/MediaList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { options } from '@/config/ConfigChart';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import WeekChart from '@/components/WeekChart/WeekChart';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

const cx = classNames.bind(styles);
Chart.register(...registerables);

function ZingChart() {
    let [chart, setChart] = useState({});
    let [weekChart, setWeekChart] = useState({});
    let [items, setItems] = useState([]);
    let [showTop100, setShowTop100] = useState(false);
    let dispatch = useDispatch();

    let labels = [];
    let counter1 = [];
    let counter2 = [];
    let counter3 = [];
    let data = {};
    let playlist = [];

    useEffect(() => {
        const getChartHome = async () => {
            dispatch(setIsLoading(true));

            let res = await getChartHomeAPI();

            if (res.err === 0) {
                setItems(res.data.RTChart.items);
                setChart(res.data.RTChart.chart);
                setWeekChart(res.data.weekChart);
                dispatch(setIsLoading(false));
            }
        };

        getChartHome();
    }, [dispatch]);

    let handleTimes = (times) => {
        let labels = [];
        times.forEach((item, index) => {
            if (index % 2 === 0 && index < 23) {
                labels.push(item.hour + ':00');
            }
        });
        return labels;
    };

    let handleCounter = (items, encodeId) => {
        let counters = [];
        items[encodeId].forEach((item, index) => {
            if (index % 2 === 0 && index < 24) {
                counters.push(item.counter);
            }
        });
        return counters;
    };

    const handleChart = () => {
        if (!_.isEmpty(chart) && items) {
            console.log('re-render');
            options.scales.y.min = chart.minScore;
            options.scales.y.max = chart.maxScore;

            labels = handleTimes(chart.times);
            counter1 = handleCounter(chart.items, items[0].encodeId);
            counter2 = handleCounter(chart.items, items[1].encodeId);
            counter3 = handleCounter(chart.items, items[2].encodeId);

            data = {
                labels,
                datasets: [
                    {
                        label: items[0].title,
                        data: counter1,
                        backgroundColor: 'rgb(74,144,226)',
                        borderColor: 'rgb(74,144,226)',
                        borderWidth: 2,
                        tension: 0.3,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'rgb(74,144,226)',
                        pointHoverBackgroundColor: 'rgb(74,144,226)',
                        pointHoverBorderColor: 'white',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 3,
                        pointHitRadius: 8,
                        radius: 5,
                        pointHoverRadius: 8,
                        showPoint: false,
                    },

                    {
                        label: items[1].title,
                        data: counter2,
                        backgroundColor: 'rgb(39, 189, 156)',
                        borderColor: 'rgb(39, 189, 156)',
                        borderWidth: 2,
                        tension: 0.3,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'rgb(39, 189, 156)',
                        pointHoverBackgroundColor: 'rgb(39, 189, 156)',
                        pointHoverBorderColor: 'white',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 3,
                        radius: 5,
                        pointHoverRadius: 8,
                    },

                    {
                        label: items[2].title,
                        data: counter3,
                        backgroundColor: 'rgb(227, 80, 80)',
                        borderColor: 'rgb(227, 80, 80)',
                        borderWidth: 2,
                        tension: 0.3,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'rgb(227, 80, 80)',
                        pointHoverBackgroundColor: 'rgb(227, 80, 80)',
                        pointHoverBorderColor: 'white',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 3,
                        radius: 5,
                        pointHoverRadius: 8,
                    },
                ],
            };

            playlist = showTop100 ? items : items.slice(0, 10);
        }
    };

    handleChart();

    return (
        <>
            <div className={cx('wrapper-chart')}>
                <div className={cx('line-chart-wrapper')}>
                    <div className={cx('chart-header')}>
                        <span>#zingchart</span>
                        <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                    </div>

                    <div className={cx('line-chart')}>{!_.isEmpty(data) && <Line options={options} data={data} />}</div>
                </div>

                {playlist && <MediaList data={playlist} type="rank" />}

                <div className={cx('zingchart-showtop')} onClick={() => setShowTop100(!showTop100)}>
                    <div className={cx('show-more')}>{showTop100 ? 'Xem top 10' : 'Xem top 100'}</div>
                </div>
            </div>

            <div className={cx('wrapper-weektop')}>
                <div className={cx('bg-alpha')}>
                    <div className={cx('section-header')}>
                        {!_.isEmpty(weekChart) && <Link to={weekChart.vn.link}>Bảng xếp hạng tuần</Link>}
                    </div>

                    <div className={cx('week-chart-box')}>
                        <div className={cx('week-chart-item')}>
                            <div className={cx('header-item')}>
                                {!_.isEmpty(weekChart) && <Link to={weekChart.vn.link}>Việt Nam</Link>}
                                <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                            </div>
                            {!_.isEmpty(weekChart) && <WeekChart data={weekChart.vn.items.slice(0, 5)} type="rank" />}
                            <div className={cx('weekchart-footer')}>
                                <div className="show-more">Xem thêm</div>
                            </div>
                        </div>

                        <div className={cx('week-chart-item')}>
                            <div className={cx('header-item')}>
                                {!_.isEmpty(weekChart) && <Link to={weekChart.us.link}>US-UK</Link>}
                                <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                            </div>
                            {!_.isEmpty(weekChart) && <WeekChart data={weekChart.us.items.slice(0, 5)} type="rank" />}
                            <div className={cx('weekchart-footer')}>
                                <div className="show-more">Xem thêm</div>
                            </div>
                        </div>

                        <div className={cx('week-chart-item')}>
                            <div className={cx('header-item')}>
                                {!_.isEmpty(weekChart) && <Link to={weekChart.korea.link}>K-POP</Link>}
                                <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                            </div>
                            {!_.isEmpty(weekChart) && (
                                <WeekChart data={weekChart.korea.items.slice(0, 5)} type="rank" />
                            )}
                            <div className={cx('weekchart-footer')}>
                                <div className="show-more">Xem thêm</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ZingChart;
