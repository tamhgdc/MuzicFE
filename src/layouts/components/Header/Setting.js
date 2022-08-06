import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listItemMain, listItemImplement } from './ListItem';

const cx = classNames.bind(styles);

function Setting() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('menu-item')}>
                {listItemMain &&
                    listItemMain.map((item) => {
                        return (
                            <li>
                                <FontAwesomeIcon icon={item.icon} className={cx('icon')} />
                                <span>{item.value}</span>
                            </li>
                        );
                    })}
            </ul>

            <div className={cx('menu-implement')}>
                {listItemImplement &&
                    listItemImplement.map((item, index) => {
                        return (
                            <a href={item.href ? item.href : '#'} target={item.href && '_blank'} title={item.value}>
                                <FontAwesomeIcon icon={item.icon} className={cx('icon')} />
                                <span>{item.value}</span>
                            </a>
                        );
                    })}
            </div>
        </div>
    );
}

export default Setting;
