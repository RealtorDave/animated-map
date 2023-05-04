import React, {useState, useEffect} from 'react'
import MapGL from 'react-map-gl';
import {TripsLayer} from '@deck.gl/geo-layers';
import { DeckGL } from 'deck.gl';

import torontoData from './toronto.json';
import vancouverData from './vancouver.json';
import {generateData} from './helpers';

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from 'mapbox-gl';
// @ts-ignore
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function Map({ 
    width, 
    height, 
    viewState, 
    onChangeViewState, 
    currentCity
}) {
    //generateData('vancouver', 1500);
    const [time, setTime] = useState(0);
    const [animation] = useState({});
    const loopLength = 1800;
    const animationSpeed = 0.15;

    useEffect(() => {
        const animate = () => {
          setTime(t => (t + animationSpeed) % loopLength);
          animation.id = window.requestAnimationFrame(animate);
        };
        animation.id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animation.id);
    }, [animation]);

    const layers = [
        new TripsLayer({
            id: 'trips-layer',
            data: currentCity === 'toronto' ? torontoData : vancouverData,
            getPath: d => d.path,
            getTimestamps: d => d.timestamps,
            getColor: d => {
                if (d.value <= 100){
                    return [0, 255, 0, 255];
                }
                else if (d.value <= 500){
                    return [152, 219, 0, 255];
                }
                else if (d.value <= 1000){
                    return [248, 102, 0, 255];
                }
                else if (d.value <= 4000){
                    return [255, 0, 0, 255];
                }
                else{
                    return [255, 0, 255, 255];
                }
            },
            opacity: 1.0,
            widthMinPixels: 4,
            rounded: true,
            trailLength: 3,
            currentTime: time,
        }),
    ];

    return (
    <>
        <DeckGL
            initialViewState = {viewState}
            onViewStateChange = {onChangeViewState}
            layers={layers}
            controller={true}
            >
            <MapGL
            style={{width, height}}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            />
        </DeckGL>
    </>
    )
}
