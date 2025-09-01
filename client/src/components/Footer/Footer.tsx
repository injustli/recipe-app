import { Flex, Text } from '@mantine/core';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex justify="center" align="center" className={styles.footer}>
      <Text span ta="center" c="gray">
        ©{currentYear} Mealplanner
      </Text>
    </Flex>
  );
};

export default Footer;
