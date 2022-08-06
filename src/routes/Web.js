import Home from '@/pages/Home/Home';
import Album from '@/pages/Album/Album';
import Top100 from '@/pages/Top100/Top100';
import ZingChart from '@/pages/ZingChart/ZingChart';
import ZingChartWeek from '@/pages/ZingChart/ZingChartWeek';
import NewReleaseChart from '@/pages/ZingChart/NewReleaseChart';
import Singer from '@/pages/Singer/Singer';
import MyMusic from '@/pages/MyMusic/MyMusic';
import PageSearch from '@/pages/Search/PageSearch';
import config from '@/config';

const publicRoutes = [
    { path: config.routes.top100, component: Top100 },
    { path: config.routes.album, component: Album },
    { path: config.routes.playlist, component: Album },
    { path: config.routes.zingchart, component: ZingChart },
    { path: config.routes.zingchartWeek, component: ZingChartWeek },
    { path: config.routes.newReleaseChart, component: NewReleaseChart },
    { path: config.routes.pageSearch, component: PageSearch },
    { path: config.routes.singerName, component: Singer },
    { path: config.routes.singerTab, component: Singer },
    { path: config.routes.myMusic, component: MyMusic },
    { path: config.routes.home, component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
