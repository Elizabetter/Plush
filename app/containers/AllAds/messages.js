import { defineMessages } from 'react-intl';

export const scope = 'app.components.AllAds';

export default defineMessages({
  userNotFound: {
    id: `${scope}.userNotFound`,
    defaultMessage: 'Пользователь не выбран.',
  },
  information: {
    id: `${scope}.information`,
    defaultMessage: 'Информация',
  },
  vacation: {
    id: `${scope}.vacation`,
    defaultMessage: 'Осталось дней отпуска: ',
  },
  daysOff: {
    id: `${scope}.daysOff`,
    defaultMessage: 'Всего отгулов: ',
  },
  manager: {
    id: `${scope}.manager`,
    defaultMessage: 'Руководитель',
  },
  project_manager: {
    id: `${scope}.project_manager`,
    defaultMessage: 'Проектный менеджер: ',
  },
  department_manager: {
    id: `${scope}.department_manager`,
    defaultMessage: 'Руководитель отдела: ',
  },
  statements: {
    id: `${scope}.statements`,
    defaultMessage: 'Мои заявления',
  },
  createStatement: {
    id: `${scope}.createStatement`,
    defaultMessage: 'Создать заявление',
  },
});
