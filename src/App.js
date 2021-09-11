import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from 'pages/Home';
import Upload from 'pages/Upload';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </div>
  );
}

export default App;
