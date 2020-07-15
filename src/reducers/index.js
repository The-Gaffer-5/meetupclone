import {combineReducers} from 'redux'

const initialState = {
    lat: 48.14,
    lon: 11.58,
    loading: true,
    events: [],
    suggestions: [],
    error: '',
    city: 'Stockholm, SE',
    popupOpen: false,
    popup: '',
    modalOpen: false,
    modal: {},
    radiusDisplay: '10 miles',
    radius: (10 * 1.44) / 100,
    openingModal: true,
    query: ''
}
const getAPIEvents = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_EVENTS_REQUEST':
            return {
                ...state,
                loading: true,
                lat: action.payload.lat,
                lon: action.payload.lon
            }
        case 'FETCH_EVENTS_SUCCESS':
            //ADD A BACKGROUND IMAGE TO THE EVENT SINCE MEETUP DOES NOT PROVIDE ONE
            let listOfEvents = action.payload.events
            listOfEvents.forEach(event => {
                event.backgroundImageNumber = Math.floor(Math.random() * 11)
            });
            let theArea;
            if(action.payload.city.state) {
                theArea = action.payload.city.state
            } else {
                theArea = action.payload.city.country
            }
            return {
                ...state,
                loading: false,
                events: listOfEvents,
                error: '',
                city: `${action.payload.city.city}, ${theArea}`
            }
        case 'FETCH_EVENTS_FAILURE':
            return {
                ...state,
                loading: false,
                events: [],
                error: action.payload,
            }
        default: return state
    }
}

const fetchAPISuggestions = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_CITY_SUGGESTIONS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_CITY_SUGGESTIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                suggestions: action.payload,
                error: ''
            }
        case 'FETCH_CITY_SUGGESTIONS_FAILURE':
            return {
                ...state,
                loading: false,
                suggestions: [],
                error: action.payload
            }
        case 'CLEAR_CITY_SUGGESTIONS':
            return {
                ...state,
                loading: false,
                suggestions: [],
                error: ''
            }
        default: return state
    }
}
const togglePopupReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_POPUP':
            return {
                ...state,
                popupOpen: !state.popupOpen,
                popup: action.payload
            }
        default: return state
    }
}
const toggleModalReducer = (state = initialState, action) => {
        switch(action.type) {
            case 'TOGGLE_MODAL':
                return {
                    ...state,
                    modalOpen: !state.modalOpen,
                    modal: action.payload
                }
            default: return state
        }
    }
const changeRadiusReducer = (state = initialState, action) => {
        switch(action.type) {
            case 'CHANGE_RADIUS':
                return {
                    ...state,
                    radiusDisplay: action.payload.display,
                    radius: action.payload.radius
                }
            default: return state
        }
}
const closeOpeningModalReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CLOSE_OPENING_MODAL':
            return {
                ...state,
                openingModal: false
            }
        default: return state
    }
}
const filterEvents = (state = initialState, action) => {
    switch(action.type) {
        case 'FILTER_EVENTS':
            return {
                ...state,
                query: action.payload
            }
        default: return state
    }
}
const rootReducer = combineReducers({
    fetchAPISuggestions,
    getAPIEvents,
    togglePopupReducer ,
    changeRadiusReducer,
    toggleModalReducer,
    closeOpeningModalReducer,
    filterEvents
})
export default rootReducer;