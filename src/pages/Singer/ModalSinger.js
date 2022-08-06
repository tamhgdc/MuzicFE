import './ModalSinger.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function ModalSinger({ singerInfo, isOpen, handleClose }) {
    return (
        isOpen && (
            <div className="modal" onClick={handleClose}>
                <div className="modal-singer">
                    <div className="modal-singer-header">
                        <img src={singerInfo.thumbnailM} alt={singerInfo.name} />
                        <div className="modal-text-block">
                            <div className="modal-text-item">
                                <span>Tên thât: </span>
                                <span className="infor">{singerInfo.realname}</span>
                            </div>

                            <div className="modal-text-item">
                                <span>Sinh nhật: </span>
                                <span className="infor">{singerInfo.birthday}</span>
                            </div>

                            <div className="modal-text-item">
                                <span>Quốc tịch: </span>
                                <span className="infor"> {singerInfo.national} </span>
                            </div>
                        </div>

                        <Tippy content="Đóng">
                            <div className="close-btn" onClick={handleClose}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </Tippy>
                    </div>

                    <div className="modal-content" dangerouslySetInnerHTML={{ __html: singerInfo.biography }}></div>
                </div>
            </div>
        )
    );
}

export default ModalSinger;
