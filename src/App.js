import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './screens/Landing';
import Results from './screens/Results';

import './App.css';
import './mobile.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Landing} />{' '}
        {/* PUBLIC_URL so landing page works on GH Pages */}
        <Route exact path='/results' component={Results} />
      </Switch>
    </Router>
  );
}

export default App;
