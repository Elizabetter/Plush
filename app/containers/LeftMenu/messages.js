/*
 * menu Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LeftMenu';

export default defineMessages({
  agreements: {
    id: `${scope}.agreements`,
    defaultMessage: 'Все объявления',
  },
  create: {
    id: `${scope}.create`,
    defaultMessage: 'Создать объявление',
  },
  usersAds: {
    id: `${scope}.usersAds`,
    defaultMessage: 'Мои объявления',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Плюшкин',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Выйти',
  },
});
