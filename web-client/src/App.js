import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminMatchesScreen from './screens/AdminMatchesScreen';
import './App.css';
import LoginForm from './screens/LoginForm';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
function App() {

  return (
   <Router>
     <Switch>
       <Route exact path="/login" component={LoginForm}/>
       <Route exact path="/match" component={AdminMatchesScreen}/>
       <LoginForm/>
     </Switch>
   </Router>
  );
}

export default App;
