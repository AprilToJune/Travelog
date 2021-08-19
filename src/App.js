import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Hi from 'components/Hi';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hi" component={Hi} />
      </Switch>
    </div>
  );
}

export default App;
