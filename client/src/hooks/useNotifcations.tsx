import { notifications } from '@mantine/notifications';
import classes from './Notifications.module.css';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

const useNotifications = () => {
  const handleSuccess = (message: string) => {
    notifications.show({
      title: 'Success',
      message,
      classNames: classes,
      autoClose: 3000,
      color: 'rgba(0, 186, 19, 1)',
      withCloseButton: true,
      icon: <BsCheckCircleFill size={18} />,
      position: 'top-right'
    });
  };

  const handleError = (message: string) => {
    notifications.show({
      title: 'Error',
      message,
      classNames: classes,
      autoClose: 3000,
      color: 'rgba(186, 0, 0, 1)',
      withCloseButton: true,
      icon: <BsXCircleFill size={18} />,
      position: 'top-right'
    });
  };

  return { handleSuccess, handleError };
};

export default useNotifications;
