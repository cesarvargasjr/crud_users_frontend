import styled from 'styled-components';
import colors from '../../styles/colors';

export const ContainerPage = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${colors.greyLight};
  padding: 0 20px;
`;

export const ContainerLoading = styled.div`
  position: absolute;
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  z-index: 99999;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 50px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2px 2px #0001;
  background-color: ${colors.white};
`;

export const ContainerLine = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerButton = styled.div`
  display: flex;
  margin-top: 25px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: ${colors.blue};
  width: 100%;
  text-align: center;
  margin-bottom: 35px;
`;
