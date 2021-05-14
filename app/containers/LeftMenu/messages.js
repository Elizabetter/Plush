/*
 * menu Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LeftMenu';

export default defineMessages({
  main: {
    id: `${scope}.main`,
    defaultMessage: 'Вернуться на главную',
  },
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
  users: {
    id: `${scope}.users`,
    defaultMessage: 'Все пользователи',
  },
  db: {
    id: `${scope}.db`,
    defaultMessage: 'База данных',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Плюшкин',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Выйти',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Мой профиль',
  },
});
