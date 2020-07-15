import React from 'react';
import './event.css'
import { toggleModal } from '../../actions';
import {useDispatch} from 'react-redux'
import backgroundPicture1 from './default1.jpg'
import backgroundPicture2 from './default2.jpg'
import backgroundPicture3 from './default3.jpg'
import backgroundPicture4 from './default4.jpg'
import backgroundPicture5 from './default5.jpg'
import backgroundPicture6 from './default6.jpg'
import backgroundPicture7 from './default7.jpg'
import backgroundPicture8 from './default8.jpg'
import backgroundPicture9 from './default9.jpg'
import backgroundPicture10 from './default10.jpg'
import backgroundPicture11 from './default11.jpg'
import backgroundPicture12 from './default12.jpg'


function Event(props){
    //GENERATE RANDOM BACKGROUND IMAGE
    const pictureArray = [backgroundPicture1, backgroundPicture2, backgroundPicture3, backgroundPicture4, backgroundPicture5, backgroundPicture6, backgroundPicture7, backgroundPicture8, backgroundPicture9, backgroundPicture10, backgroundPicture11, backgroundPicture12]
    const thisEvent = props.event
    const dispatch = useDispatch()
    function openModal(thisEvent) {
        dispatch(toggleModal(thisEvent))
    }

    return (
        <div className="event-box" onClick={() => openModal(thisEvent)} style={{backgroundImage: 'url(' + pictureArray[props.event.backgroundImageNumber] +')'}}>
            <h4 className="event-title">{props.event.name}</h4>
        </div>
    )
}

export default Event;