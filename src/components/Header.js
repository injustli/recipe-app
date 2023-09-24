import { startTransition } from 'react';
import SearchAndFilter from './SearchAndFilter';
import jwt_decode from 'jwt-decode';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Dropdown, DropdownButton, Navbar, Container } from 'react-bootstrap';
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

  const navigate = useNavigate();

  // Adds a new user if user doesn't exist in database, otherwise do nothing
  const handleCallbackResponse = (response) => {
    setToken(response.credential);
    const userObject = jwt_decode(response.credential);
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
        }
      })
      .catch((err) => console.log('callbackResponse Error: ', err));
  };

  const navigateTo = (route) => {
    switch (route) {
      case 'My Recipes':
        navigate(`/user/${user.name}/recipes`);
        break;
      case 'My Meal Plan':
        navigate(`/user/${user.name}/mealplan`);
        break;
      case 'Sign Out':
        startTransition(() => {
          setUser(null);
        });
      // eslint-disable-next-line
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
          )}
        </div>
      </Container>
    </Navbar>
  );
}
