import './App.css';
import { Route, } from 'react-router-dom'
import React from 'react'


//        RUTAS 
import LandingPage from './components/landing/LandingPage';
import Home from './components/home/Home';
import Activity from './components/home/activity/Activity';
import CountryDetail from './components/home/CardCountryDetail/CardCountryDetail';  


function App() {

  
  return (  
    <div>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path="/activities" component={Activity}  />
      <Route exact path="/detail/:id" component={CountryDetail}  />

      
   </div> 
  );
}

export default App;

