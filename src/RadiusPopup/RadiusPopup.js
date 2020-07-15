import React from 'react'
import './radius-popup.css'
import {useSelector, useDispatch} from 'react-redux'
import { changeRadius, togglePopup } from '../actions'


function RadiusPopup() {
    const popup = useSelector(state => state.togglePopupReducer)
    const dispatch = useDispatch()
    function switchMiles(dist) {
        dispatch(changeRadius(dist))
        dispatch(togglePopup())
    }
    if(popup.popupOpen && popup.popup === 'radius') {
        return (
            <div className="RadiusPopup">
                <div className="radius-popup-triangle"></div>
                <div className="radius-popup-wrapper">
                    <div className="list-wrapper">
                        <ul>
                            <li className="radius-item" onClick={() => switchMiles('2')}>2 miles</li>
                            <li className="radius-item" onClick={() => switchMiles('5')}>5 miles</li>
                            <li className="radius-item" onClick={() => switchMiles('10')}>10 miles</li>
                            <li className="radius-item" onClick={() => switchMiles('25')}>25 miles</li>
                            <li className="radius-item" onClick={() => switchMiles('50')}>50 miles</li>
                            <li className="radius-item" onClick={() => switchMiles('100')}>100 miles</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default RadiusPopup