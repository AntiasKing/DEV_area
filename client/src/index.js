import React from 'react';
import ReactDOM from 'react-dom';

// Material-UI imports
import { CssBaseline } from '@material-ui/core';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import './index.css';
import AppRouter from './Router';

library.add(fab);

ReactDOM.render(
    <React.Fragment>
        <CssBaseline></CssBaseline>
        <AppRouter />
    </React.Fragment>,
    document.getElementById('root')
)