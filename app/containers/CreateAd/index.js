import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PageTemplate from '../PageTemplate';
import { CREATE_AD } from '../../constants/endpoints';
import { createAdAction } from './actions';
import { routes } from '../../constants/routes';
import { createEntityAction } from '../App/actions';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import CreateAdForm from '../CreateAdForm';

export function CreateAd() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useAuthDataContext();
  const [isSendingUserData, setSendingUserData] = React.useState(false);
  const onCreateStatementFormSubmit = ({ ...data }) => {
    if (Object.keys(data).length > 0) {
      setSendingUserData(true);
      const { topic, content, city, phoneNumber, price, photo } = data;
      const payload = {
        endpoint: CREATE_AD(user?.id),
        sagaRoutine: createAdAction,
        params: {
          topic,
          content,
          city,
          phoneNumber,
          price,
          photo,
        },
        callback: () => {
          history.push(routes.MY_ADS);
        },
      };
      dispatch(createEntityAction(payload));
    } else {
      history.push(routes.ADS);
    }
  };

  return (
    <PageTemplate header="Новое объявление">
      <CreateAdForm
        onSubmit={onCreateStatementFormSubmit}
        isSendingUserData={isSendingUserData}
      />
    </PageTemplate>
  );
}
