/*
 * SignIn Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SignIn';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Вход',
  },
  errorAlert: {
    id: `${scope}.errorAlert`,
    defaultMessage: 'Не удалось войти. Попробуйте еще раз.',
  },
});
