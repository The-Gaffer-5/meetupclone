import React from 'react'
import './city-search-popup.css'
import {useSelector} from 'react-redux'
import {fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure} from '../../actions'
import CitySearch from '../CitySearch/CitySearch'

function CitySearchPopup() {

    const popup = useSelector(state => state.togglePopupReducer)
  
    const updateEvents = (lat, lon) => {
      return function(dispatch) {
        dispatch(fetchEventsRequest(lat, lon))
        .then(data => {
          const events = data
          dispatch(fetchEventsSuccess(events))
        })
        .catch(error => {
          dispatch(fetchEventsFailure(error))
        })
      }
    }


    if(popup.popupOpen && popup.popup === 'city') {
      return (
        <div className="CitySearchPopup">
          <div className="little-triangle"></div>
          <div className="searchbar-wrapper">
            <CitySearch updateEvents={updateEvents} />
          </div>
        </div>
      )
    } else {
      return null
    }
}

export default CitySearchPopup