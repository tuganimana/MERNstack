import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as Bundles from './components/Bundles';

import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Draft from 'draft-js/dist/Draft.css';
import Main from 'react-progress-2/style.css';
import Progress from  'react-progress-2/main.css';

import loaders from 'loaders.css';
import base from 'react-spinkit/css/base.css';
import loaderscss from 'react-spinkit/css/loaders-css.css';
import fade from 'react-spinkit/css/fade-in.css';
import chasing from 'react-spinkit/css/chasing-dots.css';
import circle from 'react-spinkit/css/circle.css';
import cube from 'react-spinkit/css/cube-grid.css';
import bounce from 'react-spinkit/css/double-bounce.css';
import folding from 'react-spinkit/css/folding-cube.css';
import pulse from 'react-spinkit/css/pulse.css';
import plane from 'react-spinkit/css/rotating-plane.css';
import three from 'react-spinkit/css/three-bounce.css';
import cubers from 'react-spinkit/css/wandering-cubes.css';
import wave from 'react-spinkit/css/wave.css';
import word from 'react-spinkit/css/wordpress.css';

const splitPoints = window.splitPoints || [];

Promise.all(splitPoints.map(chunk => Bundles[chunk].loadComponent()))
.then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
