import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from "./components/Dashboard";

const AppRouter = () => (
    <Router>
        <div>
            <Route path="/" exact component={Landing} />
            <Route path='/sign-in' exact component={SignIn} />
            <Route path='/register' exact component={Register} />
            <Route path='/dashboard' exact component={Dashboard} />
        </div>
    </Router>
);

export default AppRouter;