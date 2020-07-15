import React from 'react'
import './event-modal.css'
import {useSelector, useDispatch} from 'react-redux'
import {toggleModal} from '../../actions'
import backgroundPicture1 from '../Event/default1.jpg'
import backgroundPicture2 from '../Event/default2.jpg'
import backgroundPicture3 from '../Event/default3.jpg'
import backgroundPicture4 from '../Event/default4.jpg'
import backgroundPicture5 from '../Event/default5.jpg'
import backgroundPicture6 from '../Event/default6.jpg'
import backgroundPicture7 from '../Event/default7.jpg'
import backgroundPicture8 from '../Event/default8.jpg'
import backgroundPicture9 from '../Event/default9.jpg'
import backgroundPicture10 from '../Event/default10.jpg'
import backgroundPicture11 from '../Event/default11.jpg'
import backgroundPicture12 from '../Event/default12.jpg'

function EventModal() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.toggleModalReducer)
    const pictureArray = [backgroundPicture1, backgroundPicture2, backgroundPicture3, backgroundPicture4, backgroundPicture5, backgroundPicture6, backgroundPicture7, backgroundPicture8, backgroundPicture9, backgroundPicture10, backgroundPicture11, backgroundPicture12]

    function closeModal(target) {
        if(target === 'EventModal') {
            dispatch(toggleModal([]))
        }
    }
    if(state.modalOpen) {
        return (
            <div className="EventModal" id="EventModal" onClick={(e) => closeModal(e.target.id)}>
                <div className="modal-content" id="modal-content" onClick={(e) => closeModal(e.target.id)} style={{backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(' + pictureArray[state.modal.backgroundImageNumber] +')'}}>
                    <div className="the-x" onClick={() => closeModal('EventModal')}>x</div>
                    <h2 className="modal-title">{state.modal.name}</h2>
                    <h4 className="modal-date">Date: {state.modal.local_date}</h4>
                    <h4 className="modal-time">Time: {state.modal.local_time}</h4>
                    <a className="modal-link" target="_blank" href={state.modal.link}>Click here for more info!</a>
                </div>
            </div>
        )
    } else {
        return(
            null
        )
    }
}
export default EventModal