import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ChangePassword';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Смена пароля',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'Старый пароль',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Новый пароль',
  },
  matchingNewPassword: {
    id: `${scope}.matchingNewPassword`,
    defaultMessage: 'Повторение нового пароля',
  },
});
