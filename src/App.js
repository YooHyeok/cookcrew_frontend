import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageHome from './components/PageHome';
/* CSS */
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/diet/fullcalendar.css';
/* 컴포넌트 */
import Header from './component/info/Header';
import Footer from './component/info/Footer';

import DietScheduler from './component/diet/DietScheduler';
import DietChallenge from './component/rank/DietChallenge';

import RecipeCreate from "./component/recipe/RecipeCreate";
import RecipeMod from "./component/recipe/RecipeMod";
import RecipeRef from "./component/recipe/RecipeRef";

import Join from './component/user/Join';
import Login from './component/user/Login';

import MyPage from './component/user/MyPage';
import MyPageMod from './component/user/MyPageMod';
import MyLikeCardList from './component/recipe/MyLikeCardList';
import MyRecipeList from './component/recipe/MyRecipeList';
import MyPageRecipeCardList from './component/recipe/MyPageRecipeCardList';
import ToDoList from './component/user/ToDoList';

import RecipePage from './components/recipecomponents/RecipePage';
import PopRecipe from './components/recipecomponents/PopRecipe';

import SearchResult from './components/recipecomponents/SearchResult';
function App() {
  return (

  <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path='/' element={<PageHome />} />
              {/* 식단표 관리 */}
              <Route exact path='/dietScheduler' element={<DietScheduler />} />
               {/* 전체 레시피 */}
              <Route exact path='/recipepage' element={<RecipePage />} />
              {/* 전체 레시피 */}
              <Route exact path='/recipepage' element={<RecipePage/>} />
              <Route exact path='/recipepage/:page' element={<RecipePage/>} />
              {/* 인기 레시피 */}
              <Route exact path='/popRecipe' element={<PopRecipe />} />
              {/* 레시피 검색 */}
              <Route exact path='/searchresult/:keyword' element={<SearchResult/>} />
              {/* 베스트 쉐프 */}
              {/* <Route exact path='/bestChef' /> */}
              {/* 챌린지 랭킹 */}
              <Route exact path='/challengeRank' element={<DietChallenge />}/>
              {/* 레시피 등록 */}
              <Route exact path='/recipecreate' element={<RecipeCreate />} />
              {/* 레시피 상세 */}
              <Route exact path='/reciperef/:rNo' element={<RecipeRef />} />
              {/* 레시피 수정 */}
              <Route exact path='/recipemod/:rNo' element={<RecipeMod />} />
              {/* 회원가입 */}
              <Route exact path='/join' element={<Join />} />
              {/* 로그인 */}
              <Route exact path='/login' element={<Login />} />
              {/* 마이페이지 */}
              <Route exact path='/mypage' element={<MyPage />} />
              {/* 마이페이지 수정 */}
              <Route exact path='/mypagemod' element={<MyPageMod />} />
              {/* 마이페이지 나의 레시피 리스트*/}
              <Route exact path='/mypagerecipelist' element={<MyPageRecipeCardList />} />
              {/* 마이페이지 나의 레시피*/}
              <Route exact path='/myrecipelist' element={<MyRecipeList />} />
              {/* 마이페이지 나의 찜목록 카드 */}
              <Route exact path='/mylikelist' element={<MyLikeCardList />} />
              <Route exact path='/mylikelist/:page' element={<MyLikeCardList />} />
              {/* 마이페이지 투두리스트 */}
              <Route exact path='/todolist' element={<ToDoList />} />
            </Routes>
            <Footer />
          </BrowserRouter>
    </div>
  );
}

export default App;
