import styled from 'styled-components';

const FormActions = styled.div`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  & > button {
    margin-right: 8px;
  }
`;

export const FormActionsDisplay = styled.div`
  margin-left: 6px;
  margin-top: 8px;
  width: 100%;
  display: flex;
  height: 31px;
  & > button {
    margin-right: 8px;
  }
`;

export default FormActions;
