import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PageHome from './components/PageHome';
import RecipeDetailPage from './components/recipecomponents/RecipeDetailPage';
import RecipeList from './components/recipecomponents/RecipeList';
import ChefRankingPage from './components/chefrankingcomponents/ChefRankingPage';
import Recipes from './components/recipecomponents/Recipes';
// import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
    
    </div>
    <Routes>
      <Route path='/' element={<PageHome/>} />
      <Route path='/recipelist' element={<RecipeList/>} />
      <Route path='/recipes/:rno' element={<RecipeDetailPage/>} />
      {/* <Route path= 'challengeranking' element={<ChallengeRankingPage/>} /> */}
      <Route path= 'chefranking' element={<ChefRankingPage/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
