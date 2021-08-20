import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Upload from 'pages/Upload';
import { firestore } from './firebaseInit';

function App() {
  useEffect(() => {
    (async () => {
      const collectionRef = await firestore.collection('experiences').get();
      const docRef = collectionRef.docs;
      docRef.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })();
  }, []);

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
