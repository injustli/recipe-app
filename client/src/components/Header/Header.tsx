import useSession from '@/hooks/useSession';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Avatar, Button, Flex, Menu, Text } from '@mantine/core';

// Render nav bar that contains search bar, dropdown menu, login
export default function Header() {
  const { user, login, logout, loading } = useSession();

  const navigate = useNavigate();

  const navigateTo = async (route: string) => {
    switch (route) {
      case 'My Recipes':
        navigate(`/my-recipes`);
        break;
      case 'My Meal Plan':
        navigate(`/my-mealplan`);
        break;
      case 'Sign Out':
        await logout();
        navigate('/', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Flex className={classes.header} justify="space-between" align="center">
      <Text>Mealplanner</Text>
      {user ? (
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
      ) : (
        <Button
          onClick={() => login()}
          variant="outline"
          leftSection={<FcGoogle />}
        >
          Sign In
        </Button>
      )}
    </Flex>
  );
}
