import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// import './fullcalendar.css';
import './component_test/diet/fullcalendar.css';
import './component/diet/fullcalendar.css';
import { Routes, Route } from 'react-router-dom';

/* 컴포넌트 */
import Header from './component/info/Header';
import Footer from './component/info/Footer';
import Main from './component/main/Main';
import DietScheduler from './component/diet/DietScheduler';
import AllRecipe from './component/recipe/AllRecipe';
import PopRecipe from './component/recipe/PopRecipe';
import MyRecipe from './component/recipe/MyRecipe';
import RecipeWrite from './component/recipe/RecipeWrite';
import RecipeDetail from './component/recipe/RecipeDetail';
import RecipeModify from './component/recipe/RecipeModify';
import Join from './component/user/Join';
import Login from './component/user/Login';


/* 컴포넌트 테스트 */
// import AllRecipe from './component_test/recipe/AllRecipe';
// import PopRecipe from './component_test/recipe/PopRecipe';
// import MyRecipe from './component_test/recipe/MyRecipe';
// import RecipeWrite from './component_test/recipe/RecipeWrite';
// import RecipeDetail from './component_test/recipe/RecipeDetail';
// import RecipeModify from './component_test/recipe/RecipeModify';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/dietScheduler' element={<DietScheduler />} />{/* 식단표 관리 */}
        <Route exact path='/AllRecipe' element={<AllRecipe />} />{/* 전체 레시피 */}
        <Route exact path='/popRecipe' element={<PopRecipe />} />{/* 인기 레시피 */}
        <Route exact path='/bestChef' />{/* 베스트 쉐프 */}
        <Route exact path='/chalengeRank' />{/* 챌린지 랭킹 */}
        <Route exact path='/MyRecipe' element={<MyRecipe />} />{/* 나의 레시피 */}
        <Route exact path='/recipeWrite' element={<RecipeWrite />} />{/* 레시피 등록 */}
        <Route exact path='/recipedetail' element={<RecipeDetail />} />{/* 레시피 상세 */}
        <Route exact path='/recipemodify' element={<RecipeModify />} />{/* 레시피 수정 */}
        <Route exact path='/join' element={<Join />} />{/* 회원가입 */}
        <Route exact path='/login' element={<Login />} />{/* 로그인 */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
