import {mockSearchData} from '../mock-search-data'
import {mockEvents} from '../mock-events'
import {getAccessToken} from '../api'
import axios from 'axios'

const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const fetchEventsRequest = (item) => {
    if(item) {
        return {
            type: FETCH_EVENTS_REQUEST,
            payload: {
                city: item.city,
                state: item.state,
                lat: item.lat,
                lon: item.lon
            }
        }
    } 
    else {
        return {
            type: FETCH_EVENTS_REQUEST,
            payload: {
                city: 'München',
                state: 'de',
                lat: 48.14,
                lon: 11.58
            }
        }
    }
}
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const fetchEventsSuccess = (events) => {
    return {
        type: FETCH_EVENTS_SUCCESS,
        payload: events
    }
}
const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'
export const fetchEventsFailure = (error) => {
    return {
        type: FETCH_EVENTS_FAILURE,
        payload: error
    }
}
const FETCH_CITY_SUGGESTIONS_REQUEST = 'FETCH_CITY_SUGGESTIONS_REQUEST'
export const fetchCitySuggestionsRequest = () => {
    return {
        type: FETCH_CITY_SUGGESTIONS_REQUEST
    }
}
const FETCH_CITY_SUGGESTIONS_SUCCESS = 'FETCH_CITY_SUGGESTIONS_SUCCESS'
export const fetchCitySuggestionsSuccess = (suggestions) => {
    return {
        type: FETCH_CITY_SUGGESTIONS_SUCCESS,
        payload: suggestions
    }
}
const FETCH_CITY_SUGGESTIONS_FAILURE = 'FETCH_CITY_SUGGESTIONS_FAILURE'
export const fetchCitySuggestionsFailure = () => {
    return {
        type: FETCH_CITY_SUGGESTIONS_FAILURE
    }
}
const CLEAR_CITY_SUGGESTIONS = 'CLEAR_CITY_SUGGESTIONS'
export const clearCitySuggestions = () => {
    return {
        type: CLEAR_CITY_SUGGESTIONS
    }
}
const TOGGLE_POPUP = 'TOGGLE_POPUP'
export const togglePopup = (target) => {
    return {
        type: TOGGLE_POPUP,
        payload: target
    }
}
const CHANGE_RADIUS = 'CHANGE_RADIUS'
export const changeRadius = (radius) => {
    return {
        type: CHANGE_RADIUS,
        payload: {
            display: `${radius} miles`,
            radius: (radius * 1.44) / 100
        }
    }
}
const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const toggleModal = (event) => {
    return {
        type: TOGGLE_MODAL,
        payload: event
    }
}
const CLOSE_OPENING_MODAL = 'CLOSE_OPENING_MODAL'
export const closeOpeningModal = () => {
    return {
        type: CLOSE_OPENING_MODAL
    }
}
const FILTER_EVENTS = 'FILTER_EVENTS'
export const filterWithSearchbar = (query) => {
    return {
        type: FILTER_EVENTS,
        payload: query
    }
}



//ACTION CREATORS?-----------------
export const getSuggestions = (query) => {
    return async function(dispatch) {
      dispatch(fetchCitySuggestionsRequest())
      if (window.location.href.startsWith('http://localhost')) {
        const suggestions = mockSearchData
        dispatch(fetchCitySuggestionsSuccess(suggestions))
        return
      }
      const token = await getAccessToken();
      if (token) {
        const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
          + query
          + '&access_token=' + token;
        axios.get(url)
          .then(response => {
            const suggestions = response.data
            dispatch(fetchCitySuggestionsSuccess(suggestions))
          })
          .catch(error => {
            dispatch(fetchCitySuggestionsFailure(error))
          })
      }
    }
}

export const getEvents = (city) => {
    return async function(dispatch) {
        if(!city) {
            city = {
                "id": 1007700,
                "city": "Stockholm",
                "lat": 59.32,
                "lon": 18.06,
                "state": "",
                "country": "SE",
            }
        }
        dispatch(fetchEventsRequest(city))
        if (window.location.href.startsWith('http://localhost')) {
            const theEvents = mockEvents
            dispatch(fetchEventsSuccess(theEvents))
            dispatch(clearCitySuggestions())
            return
          }
        const token = await getAccessToken();
        if (token) {
            let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public &access_token=' + token;
            if (city.lat && city.lon) { url += '&lat=' + city.lat + '&lon=' + city.lon; }
            axios.get(url)
            .then(response => {
                dispatch(fetchEventsSuccess(response.data))
                dispatch(clearCitySuggestions())
            })
            .catch(error => {
                dispatch(fetchEventsFailure(error))
                dispatch(clearCitySuggestions())
            })
        }
    }
}