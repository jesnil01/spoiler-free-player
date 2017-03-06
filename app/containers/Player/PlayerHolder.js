import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  background-color:rgba(0,0,0,0.2);
`;

const Wrap = styled.div`
  margin:0 auto;
  max-width: ${props => props.fullscreen ? 'none' : '1280px'};
  width: 100%;
`;

const Inner = styled.div`
  position: relative;
  padding-bottom: 56.3%;
  overflow: auto;

  iframe{
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    // bottom:0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
`;

function PlayerHolder(props){
  return(<Outer><Wrap fullscreen={props.fullscreen}><Inner id="fs" onMouseMove={props.onMouseMove}>{props.children}</Inner></Wrap></Outer>)
}

export default PlayerHolder;
