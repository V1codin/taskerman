import styled from 'styled-components';

const StyledDivider = styled.span`
  height: inherit;
  padding: 10px 0;
  margin-left: 5px;
  border-left: 2px solid #858585;
`;

type DividerProps = {};

const Divider: React.FC<DividerProps> = () => {
  return <StyledDivider></StyledDivider>;
};
export default Divider;
