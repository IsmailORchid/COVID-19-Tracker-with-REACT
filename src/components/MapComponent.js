import React from 'react'
import './MapBox.css'
import {showDataOnMap}from '../util'
// eslint-disable-next-line no-unused-vars
import {Map as LeafletMap,TileLayer}from 'react-leaflet'
export default function MapBox({countries,casesType ,center,zoom}) {
    
    return (
        <div className="map">

            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
             {showDataOnMap(countries)}
            </LeafletMap>
            
        </div>
    )
}
