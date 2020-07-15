import React from 'react';
import './city-search.css'
import {connect, useDispatch} from 'react-redux'
import { getSuggestions, getEvents, togglePopup } from '../actions';

function CitySearch({getSuggestions, getEvents, listOfSuggestions}) {
    const dispatch = useDispatch()
    const searchCities = (query) => {
        getSuggestions(query)
    }
    const chooseCity = (item) => {
        getEvents(item)
        dispatch(togglePopup())
    }
    return(
        <div>
            <div className="CitySearch">
                <input 
                    type="text"
                    placeholder="City"
                    className="city-searchbar"
                    onChange={(e) => searchCities(e.target.value)}
                />
            </div>
            <ul className="suggestions">
                {listOfSuggestions.map(item => 
                    <li className="suggestions-item" key={item.name_string} onClick={() => chooseCity(item)} >{item.name_string}</li>    
                )}
            </ul>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        listOfSuggestions: state.fetchAPISuggestions.suggestions,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSuggestions: (query) => dispatch(getSuggestions(query)),
        getEvents: (item) => dispatch(getEvents(item))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CitySearch)
