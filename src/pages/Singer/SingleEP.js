import './Singer.scss';
import Carousel from '@/components/Carousel/Carousel';

function SingleEP({ singleEP }) {
    return (
        <div className="artist-singer-ep">
            <Carousel playlistSlider={singleEP.items} title={singleEP.title} />
        </div>
    );
}

export default SingleEP;
