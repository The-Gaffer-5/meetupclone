import React from 'react';
import './App.css';
import EventList from './EventList/EventList'
import {useSelector, useDispatch} from 'react-redux'
import {togglePopup, filterWithSearchbar} from './actions'
import CitySearchPopup from './CitySearchPopup/CitySearchPopup';
import RadiusPopup from './RadiusPopup/RadiusPopup';
import EventModal from './EventModal/EventModal';
import OpeningModal from './OpeningModal/OpeningModal';

function App() {
  const listOfEvents = useSelector(state => state.getAPIEvents)
  const popup = useSelector(state => state.togglePopupReducer)
  const radius = useSelector(state => state.changeRadiusReducer)
  const dispatch = useDispatch()

  function openClosePopup(whichPopup) {
    dispatch(togglePopup(whichPopup))
  }

  //TOGGLE INVISIBLE WRAPPER BEHIND MENUS
  let background;
  if(popup.popupOpen) {
    background = <div className="popup-background" id="popup-background" onClick={() => openClosePopup('')}></div>
  } else {
    background = null
  }

  function handleInputChange(query) {
    dispatch(filterWithSearchbar(query))
  }

  return (
    <div className="App">
      {background}
      <nav className="top-menu">
        <ul>
          <li className="meetup-logo"></li>
        </ul>
      </nav>
      <div className="title-section">
        <h1 className="main-title">Find your next event</h1>
        <p className="subtitle-title">There are 104,845 Meetups happening this week about everthing from careers to hiking, <br></br> parenting, tech, photography and urban gardening...</p>
        <div className="black-search-section">
          <input className="event-searchbar" placeholder="Search" onChange={(e) => handleInputChange(e.target.value)} />
          <p className="filter-section">within <span onClick={() => openClosePopup('radius')} className="miles-filter">{radius.radiusDisplay}</span> of <span onClick={() => openClosePopup('city')} className="city-filter">{listOfEvents.city}</span></p>
          <CitySearchPopup />
          <RadiusPopup />
        </div>
      </div>
      <EventList events={listOfEvents} />
      <EventModal />
      <OpeningModal />
    </div>
  );
}
export default App;
