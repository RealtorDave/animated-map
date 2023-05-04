import React from 'react';
import { FlyToInterpolator } from 'deck.gl';

import './App.css';
import Map from './Map';
import * as Locations from './locations';
import toronto from './toronto.png';
import vancouver from './vancouver.png';
import scale from './scale.png';

function App() {
  const [viewState, setViewState] = React.useState(Locations.toronto);
  const [currentCity, setCurrentCity] = React.useState("toronto");
  const handleViewStateChange = ({viewState}) => setViewState(viewState);
  const handleFlyTo = destination => {
    destination.longitude > -100 ? setCurrentCity("toronto") : setCurrentCity("vancouver");
    setViewState({
      ...viewState,
      ...destination,
      transitionDuration: 4000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }
  
  return (  
    <>
      <div>
        <Map 
          currentCity={currentCity}
          width="100vw" 
          height="100vh"
          onViewStateChange={handleViewStateChange}
          viewState={viewState}
          />
      </div>
      <div className='scale'>
        <img alt="scale" src={scale}/>
      </div>
      <div className='buttons'>
        <h1>Select a City</h1>
        <button key="toronto" onClick={() => handleFlyTo(Locations['toronto'])}>
          <img alt='toronto' src={toronto}/>
          Toronto
        </button>
        <button key="vancouver" onClick={() => handleFlyTo(Locations['vancouver'])}>
          <img alt='vancouver' src={vancouver}/>
          Vancouver
        </button>
      </div>
    </>
  );
}

export default App;