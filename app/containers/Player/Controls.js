import styled from 'styled-components';

const Controls = styled.div`
  background-color: #24323A;
  position: ${(props) => props.fullscreen ? 'fixed' : 'relative'};
  bottom: ${(props) => props.fullscreen ? '0' : 'auto'};
  left: ${(props) => props.fullscreen ? '0' : 'auto'};
  right: ${(props) => props.fullscreen ? '0' : 'auto'};
  padding: 30px 0;
  transform: translateY(${(props) => props.fullscreen ? '100%' : '0'});
`;

export default Controls;
