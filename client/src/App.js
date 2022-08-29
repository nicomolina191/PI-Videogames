import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route path='/create' component={CreateVideogame} />
          <Route path='/detail/:id' component={VideogameDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
