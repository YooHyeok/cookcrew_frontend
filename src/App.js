import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageHome from './components/PageHome';
import RecipeDetailPage from './components/recipecomponents/RecipeDetailPage';
import RecipeList from './components/recipecomponents/RecipeList';
import ChefRankingPage from './components/chefrankingcomponents/ChefRankingPage';
import Recipes from './components/recipecomponents/Recipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// import './fullcalendar.css';
import './component_test/diet/fullcalendar.css';
import './component/diet/fullcalendar.css';

/* 컴포넌트 */
import Header from './component/info/Header';
import Footer from './component/info/Footer';
import Main from './component/main/Main';
import DietScheduler from './component/diet/DietScheduler';
// import AllRecipe from './component/recipe/AllRecipe';
// import PopRecipe from './component/recipe/PopRecipe';
// import MyRecipe from './component/recipe/MyRecipe';

import RecipeCreate from "./component/recipe/RecipeCreate";
import RecipeMod from "./component/recipe/RecipeMod";
import RecipeRef from "./component/recipe/RecipeRef";

import Join from './component/user/Join';


/* 컴포넌트 테스트 */
// import AllRecipe from './component_test/recipe/AllRecipe';
// import PopRecipe from './component_test/recipe/PopRecipe';
// import MyRecipe from './component_test/recipe/MyRecipe';
// import RecipeWrite from './component_test/recipe/RecipeWrite';
// import RecipeDetail from './component_test/recipe/RecipeDetail';
// import RecipeModify from './component_test/recipe/RecipeModify';


function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<PageHome/>} />
        <Route exact path='/dietScheduler' element={<DietScheduler />} />{/* 식단표 관리 */}
       {/* <Route exact path='/AllRecipe' element={<AllRecipe />} />{/* 전체 레시피 */}
        {/* <Route exact path='/popRecipe' element={<PopRecipe />} />인기 레시피 */}
        <Route exact path='/bestChef' />{/* 베스트 쉐프 */}
        <Route exact path='/chalengeRank' />{/* 챌린지 랭킹 */}
        {/* <Route exact path='/MyRecipe' element={<MyRecipe />} />나의 레시피 */}
        <Route exact path='/recipecreate' element={<RecipeCreate />} />{/* 레시피 등록 */}
        <Route exact path='/reciperef/:rNo' element={<RecipeRef />} />{/* 레시피 상세 */}
        <Route exact path='/recipemod' element={<RecipeMod />} />{/* 레시피 수정 */}
        <Route exact path='/join' element={<Join />} />{/* 레시피 수정 */}
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
