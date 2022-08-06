import classNames from 'classnames/bind';
import styles from './Top100.modulo.scss';
import { useEffect, useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';

import { getTop100API } from '@/services/Top100Service';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

let cx = classNames.bind(styles);

function Top100() {
    let [top100, setTop100] = useState([]);
    let dispatch = useDispatch();

    useEffect(() => {
        let getTop100 = async () => {
            dispatch(setIsLoading(true));

            let res = await getTop100API();

            if (res.err === 0) {
                setTop100(res.data);
                dispatch(setIsLoading(false));
            }
        };

        getTop100();
    }, [dispatch]);

    return (
        <>
            <div className={cx('wrapper-top100')}>
                {top100 &&
                    top100.map((item) => {
                        return <Carousel title={item.title} playlistSlider={item.items} />;
                    })}
            </div>
        </>
    );
}

export default Top100;
