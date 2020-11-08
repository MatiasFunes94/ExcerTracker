import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/Navbar';
import ExercisesList from './components/ExercisesList';
import EditExercises from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <div className="d-flex justify-content-center" style={{height: '100vh', backgroundColor: '#2F80ED'}}>
      <div className="container mt-5">
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercises} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </Switch>
    </Router>
      </div>
    </div>
  );
}

export default App;
