import React, {Component} from 'react';
import PageHeader from '../template/pageHeader';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = ''; // API-KEY goes here

const TITLE = '<b>Fortaleza</b><br />Fortaleza is the state capital of Ceará, located in Northeastern Brazil.<br />It belongs to the Metropolitan mesoregion of Fortaleza and microregion of Fortaleza.<br />Distant 2285 km (1420 miles) from Brasilia, the federal capital.';
const LOCATION = {lat: -3.7318616, lng: -38.5266704};
const INITIAL_ZOOM = 12;

export default class About extends Component {
    
    constructor(props){
        super(props);
        this.map = null;

        this.initMap = this.initMap.bind(this);
    }

    initMap(google){
        let element = document.getElementById('map');

        this.map = new google.maps.Map(element, {
            center: LOCATION,
            zoom: INITIAL_ZOOM,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(TITLE);
        coordInfoWindow.setPosition(LOCATION);
        coordInfoWindow.open(this.map);
    }
    
    componentDidMount(){
        GoogleMapsLoader.load(this.initMap);
    }

    render(){
        return (
            <div>
                <PageHeader name="About" />
                
                <h2>Lorem ipsum dolor sit amet</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis aliquam nisl eu tempor. Maecenas convallis tellus vitae erat semper, vitae dignissim libero pretium. Morbi ante ligula, condimentum eget porttitor eu, tempus sed urna. Phasellus vitae lectus imperdiet, fringilla massa ut, auctor justo. Nulla facilisi. Mauris tincidunt felis nec egestas elementum. Nam aliquam neque quam, ut eleifend quam bibendum a. Curabitur in viverra mi. Nulla blandit ac urna et fringilla. Etiam convallis interdum quam, ac bibendum mi. Etiam elementum ligula ultricies, fringilla enim eu, fermentum purus.
                </p>

                <h2>Donec in viverra enim</h2>
                <p>
                    Donec in viverra enim, at blandit mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Proin rutrum lacus porta mi dictum, quis efficitur lacus euismod. Curabitur dapibus elit lectus, et auctor ipsum tincidunt eu. Etiam quis urna a erat ultrices pretium ac eu augue. Etiam in est vitae massa malesuada suscipit. Cras a est nec elit faucibus bibendum ac eget erat. Curabitur placerat leo magna, ac pharetra justo placerat aliquam. Nunc interdum et purus et molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi sed velit eu est auctor ultricies id quis dui. In hac habitasse platea dictumst. Nunc sodales et ex ut consectetur.
                </p>

                <h2>Location</h2>
                <div id="map" style={{width: '100%', height: '400px'}}></div>
            </div>
        );
    }
}