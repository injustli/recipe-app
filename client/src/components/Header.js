import React from 'react';
import SearchAndFilter from './SearchAndFilter';
//import { jwtDecode } from 'jwt-decode';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import {
  Dropdown,
  DropdownButton,
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Render nav bar that contains search bar, dropdown menu, login
export default function Header(props) {
  const {
    setToken,
    setUser,
    setIngredients,
    setCreator,
    setMinTime,
    setMaxTime,
    setName,
    onPageChange,
    user,
    page,
    name,
  } = props;

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: codeResponse.code,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(data.tokens);
          setUser(data.user);
          //addUser(data.id_token);
        })
        .catch((error) =>
          console.log('Error exchanging authorization code: ' + error)
        );
    },
    onError: (e) => {
      console.log('Error has occured while logging in: ' + e);
    },
    flow: 'auth-code',
  });

  // const addUser = (token) => {
  //   const userObject = jwtDecode(token);
  //   fetch('/api/users', {
  //     method: 'PUT',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: userObject.email,
  //       name: userObject.name,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.data) {
  //         setUser(data.data);
  //       }
  //     })
  //     .catch((err) => console.log('callbackResponse Error: ', err));
  // };

  const navigate = useNavigate();

  const navigateTo = (route) => {
    switch (route) {
      case 'My Recipes':
        navigate(`/user/${user.name}/recipes`);
        break;
      case 'My Meal Plan':
        navigate(`/user/${user.name}/mealplan`);
        break;
      case 'Sign Out':
        googleLogout();
      // eslint-disable-next-line no-fallthrough
      default:
        navigate('/');
    }
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
          onPageChange={(page) => onPageChange(page)}
          page={page}
          name={name}
        />
        <div className="justify-content-end">
          {user ? (
            <DropdownButton
              title="My Account"
              menuRole="menu"
              onSelect={(key) => navigateTo(key)}
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
              <Dropdown.Item as="button" eventKey="Sign Out">
                Sign Out
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <Button onClick={() => login()}>Sign In</Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
