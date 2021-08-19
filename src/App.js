import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Upload from 'pages/Upload';
import { firestore } from './firebaseInit';

function App() {
  firestore.collection('data').onSnapshot((snapshot) => {
    snapshot.docs.map((doc) => console.log(doc.id));
  });
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
