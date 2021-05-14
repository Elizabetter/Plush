import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Constants';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Мои объявления',
  },
  emptyPage: {
    id: `${scope}.emptyPage`,
    defaultMessage: 'У вас пока что нет ни одного объявления.',
  },
});
