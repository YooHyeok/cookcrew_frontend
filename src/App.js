import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageHome from './components/PageHome';
import RecipeDetailPage from './components/recipecomponents/RecipeDetailPage';
import RecipeList from './components/recipecomponents/RecipeList';
import ChefRankingPage from './components/chefrankingcomponents/ChefRankingPage';
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


import RecipeCreate from "./component/recipe/RecipeCreate";
import RecipeMod from "./component/recipe/RecipeMod";
import RecipeRef from "./component/recipe/RecipeRef";


import ChallengeRankingPage from './components/challengerankingcomponents/ChallengeRankingPage';
import Recipes from './components/recipecomponents/Recipes';
import RecipeCard from './components/recipecomponents/RecipeCard';
import MyPage from './component/user/MyPage';
import MyPageMod from './component/user/MyPageMod';

/* 컴포넌트 테스트 */
import AllRecipe from './component_test/recipe/AllRecipe';
import PopRecipe from './component_test/recipe/PopRecipe';
import DeletePage from './component/recipe/DeletePage';

import Join from './component/user/Join';
import Login from './component/user/Login';
import ToDoList from './component/user/ToDoList';
// import Profile from './component/user/Profile';
// import Mypage from './component_test/user/Mypage';

// import MyRecipe from './component_test/recipe/MyRecipe';
// import RecipeWrite from './component_test/recipe/RecipeWrite';
// import RecipeDetail from './component_test/recipe/RecipeDetail';
// import RecipeModify from './component_test/recipe/RecipeModify';

/* 라우터 */

/* 리덕스 처리 */
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './component/redux_jwt/persist-store';

let persistor = persistStore(store);

function App() {
  return (

    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path='/' element={<PageHome />} />
              <Route exact path='/dietScheduler' element={<DietScheduler />} />{/* 식단표 관리 */}
              <Route exact path='/recipelist' element={<RecipeList />} />{/* 전체 레시피 */}
              <Route exact path='/popRecipe' element={<PopRecipe />} />{/* 인기 레시피 */}
              <Route exact path='/bestChef' />{/* 베스트 쉐프 */}
              <Route exact path='/chalengeRank' />{/* 챌린지 랭킹 */}
              {/* <Route exact path='/MyRecipe' element={<MyRecipe />} />나의 레시피 */}
              <Route exact path='/recipecreate' element={<RecipeCreate />} />{/* 레시피 등록 */}
              <Route exact path='/reciperef/:rNo' element={<RecipeRef />} />{/* 레시피 상세 */}
              <Route exact path='/recipemod' element={<RecipeMod />} />{/* 레시피 수정 */}

              <Route exact path='/join' element={<Join />} />{/* 회원가입 */}
              <Route exact path='/login' element={<Login />} />{/* 로그인 */}
              <Route exact path='/mypage' element={<MyPage />} /> {/* 마이페이지 */}
              <Route exact path='/mypagemod' element={<MyPageMod />} />{/* 마이페이지 수정 */}
              <Route exact path='/todolist' element={<ToDoList />} />{/* 마이페이지 수정 */}
            </Routes>
            <Footer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
