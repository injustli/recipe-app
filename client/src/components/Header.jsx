import SearchAndFilter from './SearchAndFilter';
import useAuthStore from '@/store/authStore';
import classes from '@/styles/Header.module.css';
// import { useGoogleLogin } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useShallow } from 'zustand/react/shallow';
import { Avatar, Button, Flex, Menu, Box } from '@mantine/core';
import { useEffect, useState } from 'react';

// Render nav bar that contains search bar, dropdown menu, login
export default function Header(props) {
  const {
    setIngredients,
    setCreator,
    setMinTime,
    setMaxTime,
    setName,
    onPageChange,
    page,
    name
  } = props;

  const [user, login, logout] = useAuthStore(
    useShallow((state) => [state.user, state.login, state.logout])
  );
  const location = useLocation();
  const [googleClient, setGoogleClient] = useState(null);

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     await login(codeResponse.code);
  //   },
  //   onError: (e) => {
  //     console.log('Error has occured while logging in: ' + e);
  //   },
  //   flow: 'auth-code'
  // });
  useEffect(() => {
    // Dynamically create the Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize the Google OAuth2 client after the script loads
      if (window.google && window.google.accounts) {
        const client = window.google.accounts.oauth2.initCodeClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          ux_mode: 'popup',
          callback: async (response) => await login(response.code)
        });
        setGoogleClient(client);
      }
    };
    document.body.appendChild(script);

    // Cleanup the script on unmount if necessary
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const navigate = useNavigate();

  const navigateTo = (route) => {
    switch (route) {
      case 'My Recipes':
        navigate(`/my-recipes`);
        break;
      case 'My Meal Plan':
        navigate(`/my-mealplan`);
        break;
      case 'Sign Out':
        logout();
      // eslint-disable-next-line no-fallthrough
      default:
        navigate('/', { replace: true });
    }
  };

  return (
    <header className={classes.header}>
      <Flex justify="space-between" align="center">
        <Box
          className={location.pathname === '/my-mealplan' ? 'invisible' : null}
        >
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
        </Box>
        {user ? (
          <>
            <Menu>
              <Menu.Target>
                <Button
                  leftSection={
                    <Avatar
                      src={user.profile}
                      alt="Profile of user"
                      radius="xl"
                      size="sm"
                    />
                  }
                >
                  My Account
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => navigateTo('Home')}>Home</Menu.Item>
                <Menu.Item onClick={() => navigateTo('My Recipes')}>
                  My Recipes
                </Menu.Item>
                <Menu.Item onClick={() => navigateTo('My Meal Plan')}>
                  My Meal Plan
                </Menu.Item>
                <Menu.Item onClick={() => navigateTo('Sign Out')}>
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <>
            <Button
              onClick={() => googleClient.requestCode()}
              variant="outline"
              leftSection={<FcGoogle />}
            >
              Sign In
            </Button>
          </>
        )}
      </Flex>
    </header>
  );
}
