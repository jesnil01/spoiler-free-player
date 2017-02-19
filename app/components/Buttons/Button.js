import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
  background-color:${props => props.active ? 'green' : '#eee'};
  color:${props => props.active ? '#fff' : '#444'};
`;

export default Button;