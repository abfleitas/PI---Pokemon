import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/HomePage/Home';
import Pokedex from './components/Pokedex/Pokedex';
import Form from './components/CreatedPokemon/Form';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/pokedex/:id" component={Pokedex}/>
      <Route exact path="/create" component={Form}/>
    </div>
  );
}

export default App;
