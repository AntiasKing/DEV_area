import React from 'react';
import ReactDOM from 'react-dom';

// Material-UI imports
import { CssBaseline } from '@material-ui/core';

import './index.css';
import AppRouter from './Router';

ReactDOM.render(
    <React.Fragment>
        <CssBaseline></CssBaseline>
        <AppRouter />
    </React.Fragment>,
    document.getElementById('root')
)