import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Registration';

export default defineMessages({
  errorAlert: {
    id: `${scope}.errorAlert`,
    defaultMessage: 'Регистрация не завершена. Попробуйте еще раз.',
  },
  successAlert: {
    id: `${scope}.successAlert`,
    defaultMessage: 'Вам отправлено письмо на почту для завершения регистрации',
  },
});
