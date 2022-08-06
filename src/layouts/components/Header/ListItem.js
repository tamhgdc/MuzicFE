import {
    faBan,
    faClosedCaptioning,
    faCircleInfo,
    faComment,
    faPhone,
    faAudioDescription,
    faHandshake,
    faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

let listItemMain = [
    { icon: faBan, value: 'Danh sách chặn' },
    { icon: faClosedCaptioning, value: 'Chất lượng nhạc' },
    { icon: faCirclePlay, value: 'Giao diện' },
];

let listItemImplement = [
    { icon: faCircleInfo, value: 'Giới thiệu' },
    {
        icon: faComment,
        value: 'Góp ý',
        href: 'https://www.facebook.com/kien19quang',
    },
    { icon: faPhone, value: 'Liên hệ', href: 'https://www.facebook.com/kien19quang' },
    { icon: faAudioDescription, value: 'Quảng cáo', href: 'https://www.facebook.com/kien19quang' },
    { icon: faHandshake, value: 'Thỏa thuận' },
    { icon: faShieldHalved, value: 'Chính sách bảo mật' },
];

export { listItemMain, listItemImplement };
