import React, { useState } from 'react';
import SearchAndFilter from './SearchAndFilter';
import MyRecipes from './MyRecipes';
import MyMealPlan from './MyMealPlan';
import RecipeView from './RecipeView';
import '../styles/Header.css';
import { useFetchRecipes } from './useFetchRecipes';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { Dropdown, DropdownButton, Navbar, Container } from 'react-bootstrap';

export default function Header(props) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [creator, setCreator] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('Home');

  // Adds a new user if user doesn't exist in database, otherwise do nothing
  const handleCallbackResponse = (response) => {
    setToken(response.credential);
    let userObject = jwt_decode(response.credential);
    fetch('/users', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userObject.email,
        name: userObject.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setUser(data.data);
          document.getElementById('Google-Login').classList.add('hide');
        }
      })
      .catch((err) => console.log('callbackResponse Error: ', err));
  };

  const handleLogout = () => {
    setUser(null);
    setPage('Home');
    document.getElementById('Google-Login').classList.remove('hide');
  };

  const navigateTo = (route, event) => {
    setPage(route);
    if (route === 'Sign out') {
      handleLogout();
    }
  };

  const getMenu = () => {
    if (user) {
      return (
        <div className="justify-content-end">
          <DropdownButton
            title="My Account"
            menuRole="menu"
            onSelect={(eventKey, event) => navigateTo(eventKey, event)}
          >
            <Dropdown.Item as="button" eventKey="Home">
              Home
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="My Recipes">
              My Recipes
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="My Meal Plan">
              My Meal Plan
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="Sign out">
              Sign out
            </Dropdown.Item>
          </DropdownButton>
        </div>
      );
    }
    return null;
  };

  return (
    <Navbar className="mb-3">
      <Container fluid>
        <SearchAndFilter
          setIngredients={(ingredients) => setIngredients(ingredients)}
          setCreator={(user) => setCreator(user)}
          setMinTime={(time) => setMinTime(time)}
          setMaxTime={(time) => setMaxTime(time)}
          setName={(name) => setName(name)}
          onPageChange={(page) => setCurrentPage(page)}
        />
        {getMenu()}
        <div id="Google-Login" className="justify-content-end">
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleCallbackResponse(credentialResponse)
              }
              onError={() => console.log('Login Failed')}
            />
          </GoogleOAuthProvider>
        </div>
      </Container>
    </Navbar>
  );

  /*
  const viewRender = () => {
    switch (page) {
      case 'My Recipes':
        return (
          <>
            {loadNavBar()}
            <MyRecipes />
          </>
        );
      case 'My Meal Plan':
        return <MyMealPlan />;
      default:
        return (
          <>
            {loadNavBar()}
            <RecipeView
              data={recipes}
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
              setPageSize={(size) => setPageSize(size)}
            />
          </>
        );
    }
  };

  useFetchRecipes({
    name,
    ingredients,
    minTime,
    maxTime,
    creator,
    currentPage,
    pageSize,
  })
    .then((data) => {
      setRecipes(data.data);
      setTotalCount(data.totalCount);
    })
    .catch((err) => console.log('Error in fetching recipes: ' + err));

  return <>{viewRender()}</>;*/
}
