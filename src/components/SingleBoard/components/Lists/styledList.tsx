import styled from 'styled-components';

export const StyledList = styled.div`
  position: relative;
  padding: 15px;

  width: 270px;
  z-index: 3000;
  margin: 0 0 0 15px;

  &:first-of-type {
    margin: 0;
  }
`;

export const StyledListHeader = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.brightBlue};
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0;

  & h3 {
    word-break: break-word;
    max-width: 200px;
  }
`;
