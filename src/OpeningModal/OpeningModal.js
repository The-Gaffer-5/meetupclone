import React from 'react'
import './opening-modal.css'
import {useDispatch, useSelector} from 'react-redux'
import { closeOpeningModal, getEvents } from '../actions'

function OpeningModal() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.closeOpeningModalReducer)
    function closeModal() {
        dispatch(closeOpeningModal())
        dispatch(getEvents())
    }
    if(state.openingModal) {
        //CLOSE GREETING POPUP AUTOMATICALLY
        const searchParams = new URLSearchParams(window.location.search);
        let code = searchParams.get('code');  
        if(code) {
            closeModal()
        }
        return (
            <div className="OpeningModal">
                <div className="opening-modal-content">
                    <div className="opening-modal-logo"></div>
                    <h2 className="opening-modal-title">Welcome to my meetup clone app.</h2>
                    <div className="opening-modal-body">
                        <p>You will have to sign in to Meetup</p>
                    </div>
                    <div className="enter-btn" onClick={() => closeModal()}>Enter Site</div>
                </div>
            </div>
        )
    } else {
        return null
    }
}
export default OpeningModal;