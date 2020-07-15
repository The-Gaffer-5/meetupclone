import React from 'react';
import './event-list.css'
import {connect} from 'react-redux'
import Event from '../Event/Event'

function EventList(props) {
    let list = props.eventList
    if(!props.events.loading) {
        return (
            <div className="event-area">
                <ul className="EventList">
                    {list.map(event => 
                        <li className="Event" key={event.id}>
                            <Event event={event} />
                        </li>
                    )}
                </ul>
            </div>
        )
    } else {
        return (
            <div className="event-area">
                <h1 className="loading">loading...</h1>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {events} = state.getAPIEvents
    const {query} = state.filterEvents
    const {radius} = state.changeRadiusReducer
    const {lat} = state.getAPIEvents
    const {lon} = state.getAPIEvents
    //SEARCH BAR FILTER
    function searchFilter(query) {
        let filteredEvents = events.filter(event => {
            const lowerCaseEventName = event.name.toString().toLowerCase();
            const lowerCaseQuery = query.toString().toLowerCase();
            return lowerCaseEventName.includes(lowerCaseQuery)
        });
        return filteredEvents
    }
    //RADIUS SELECTOR FILTER
    function radiusFilter(list, radius) {
        let doubleFiltered = []
        for(let i = 0; i < list.length; i++) {
            let event = list[i]
            if((event.group.lat < (lat + radius) && event.group.lat > (lat - radius)) && (event.group.lon < (lon + radius) && event.group.lon > (lon - radius)) ) {
                doubleFiltered.push(event)
            }
        }
        return doubleFiltered
    }
    if(query !== '') {
        let filteredEvents = searchFilter(query)
        return {eventList: radiusFilter(filteredEvents, radius)}
    } else {
        return {eventList: radiusFilter(events, radius)}
    }
}
export default connect(mapStateToProps)(EventList)