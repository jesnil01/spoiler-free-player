import styled from 'styled-components';

const Tabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Tab = styled.button`
  flex-grow: 1;
  background-color: ${(props) => props.active ? '#24323A' : 'rgba(0, 0, 0, 0)'};
  text-transform: uppercase;
  font-size: 12px;
  padding: 20px;

  &:focus {
    outline: 0;
  }
`;

export { Tabs, Tab }
