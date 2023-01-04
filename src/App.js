import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageHome from './components/PageHome';
import RecipeDetailPage from './components/recipecomponents/RecipeDetailPage';
import RecipeList from './components/recipecomponents/RecipeList';
import ChefRankingPage from './components/chefrankingcomponents/ChefRankingPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// import './fullcalendar.css';
import './component/diet/fullcalendar.css';

/* 컴포넌트 */
import Header from './component/info/Header';
import Footer from './component/info/Footer';
import Main from './component/main/Main';


import DietScheduler from './component/diet/DietScheduler';
// import AllRecipe from './component/recipe/AllRecipe';
import PopRecipe from './components/recipecomponents/PopRecipe';

import RecipeCreate from "./component/recipe/RecipeCreate";
import RecipeMod from "./component/recipe/RecipeMod";
import RecipeRef from "./component/recipe/RecipeRef";


import ChallengeRankingPage from './components/challengerankingcomponents/ChallengeRankingPage';
import Recipes from './components/recipecomponents/Recipes';
import RecipeCard from './components/recipecomponents/RecipeCard';
import MyPage from './component/user/MyPage';
import MyPageMod from './component/user/MyPageMod';
import MyRecipe from './component/recipe/MyRecipe';
import MyLikelist from './component/recipe/MyLikelist';


import DeletePage from './component/recipe/DeletePage';
import Join from './component/user/Join';
import Login from './component/user/Login';
import ToDoList from './component/user/ToDoList';

// import Profile from './component/user/Profile';
import RecipePage from './components/recipecomponents/RecipePage';
import DietChallenge from './component/rank/DietChallenge';

function App() {
  return (

  <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path='/' element={<PageHome />} />
              <Route exact path='/dietScheduler' element={<DietScheduler />} />{/* 식단표 관리 */}
              <Route exact path='/recipelist' element={<RecipePage />} />전체 레시피
              <Route exact path='/popRecipe' element={<PopRecipe />} />{/* 인기 레시피 */}
              <Route exact path='/bestChef' />{/* 베스트 쉐프 */}
              <Route exact path='/challengeRank' element={<DietChallenge />}/>{/* 챌린지 랭킹 */}
              {/* <Route exact path='/MyRecipe' element={<MyRecipe />} />나의 레시피 */}
              <Route exact path='/recipecreate' element={<RecipeCreate />} />{/* 레시피 등록 */}
              <Route exact path='/reciperef/:rNo' element={<RecipeRef />} />{/* 레시피 상세 */}
              <Route exact path='/recipemod' element={<RecipeMod />} />{/* 레시피 수정 */}

              <Route exact path='/join' element={<Join />} />{/* 회원가입 */}
              <Route exact path='/login' element={<Login />} />{/* 로그인 */}
              <Route exact path='/mypage' element={<MyPage />} />{/* 마이페이지 */}

              <Route exact path='/recipepage' element={<RecipePage/>} /> {/*페이지처리*/}
              <Route exact path='/recipepage/:page' element={<RecipePage/>} /> {/*페이지처리*/}
              <Route exact path='/mypage' element={<MyPage />} /> {/* 마이페이지 */}
              <Route exact path='/mypagemod' element={<MyPageMod />} />{/* 마이페이지 수정 */}
              <Route exact path='/todolist' element={<ToDoList />} />{/* 마이페이지 투두리스트 */}
              <Route exact path='/myrecipe/:userId' element={<MyRecipe />} />
              <Route exact path='/mylikelist/:userId' element={<MyLikelist />} />

            </Routes>
            <Footer />
          </BrowserRouter>
    </div>
  );
}

export default App;
