import styled from 'styled-components';
import colors from '../../styles/colors';

export const ContainerPage = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.greyLight};
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

export const ContainerHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: ${colors.blue};
`;