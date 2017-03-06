import styled from 'styled-components';

const Controls = styled.div`
  background-color:rgba(255, 255, 255, 0.1);
  position: ${(props) => props.fullscreen ? 'fixed' : 'relative'};
  bottom: ${(props) => props.fullscreen ? '0' : 'auto'};
  left: ${(props) => props.fullscreen ? '0' : 'auto'};
  right: ${(props) => props.fullscreen ? '0' : 'auto'};
  transform: translateY(-100%)
`;

export default Controls;
