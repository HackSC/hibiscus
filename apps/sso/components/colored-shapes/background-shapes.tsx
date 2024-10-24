import React from 'react';
import styled from 'styled-components';

export const BackgroundShapes = () => (
    <>
      <BlueCircle />
      <StyledPinkStar />
      <SoftStar />
    </>
  );
  

// PINK STAR SVG

const PinkStarSvg = styled.svg`
  width: 100%;
  height: auto;
  max-width: 26.5%;
  max-height: 60%;
  position: fixed;
  bottom: 0;
  right: 0;

  path {
    fill: #FDBCB1;
    stroke: black;
    stroke-width: 2;
  }
`;

const StyledPinkStar = () => (
  <PinkStarSvg viewBox="0 0 395 599" xmlns="http://www.w3.org/2000/svg">
    <path d="M565.937 323.561L565.576 324.892L566.953 324.822L862.956 309.86L606.364 448.189L605.083 448.88L606.186 449.828L832.844 644.556L545.763 561.527L544.365 561.123L544.488 562.573L569.16 852.97L419.645 597.135L418.949 595.945L418.034 596.975L226.141 812.99L301.915 534.195L302.276 532.865L300.899 532.934L4.896 547.896L261.488 409.567L262.769 408.876L261.666 407.928L35.008 213.2L322.09 296.229L323.487 296.633L323.364 295.184L298.692 4.78641L448.207 260.621L448.903 261.811L449.818 260.781L641.711 44.7666L565.937 323.561Z" />
  </PinkStarSvg>
);


// BLUE CIRCLE SVG

const StyledSVG = styled.svg`
  width: 32%;
  height: 44%; 
  max-width: 32%; 
  max-height: 44%;
  fill: none;

  rect {
    fill: #a4d4fc;
    stroke: black;
    stroke-width: 2;
  }
  position: fixed; 
  left: -2%; 
`;

const BlueCircle = () => (
  <StyledSVG viewBox="0 0 336 339" xmlns="http://www.w3.org/2000/svg">
    <rect x="-94" y="-91" width="429" height="429" rx="214.5" />
  </StyledSVG>
);

// GREEN STAR SVG

const StyledSoftStar = styled.svg`
  /* width: 100%;   */
  max-width: 20%;
  max-height: 35%;
  fill: none;
  position: fixed; 
  left: 17%; 
  top: 5%; 
  z-index: 2; 
`;

const SoftStartPath = styled.path`
  fill: #ddfc75;
  stroke: #656565;
  stroke-width: 2;
`;

const SoftStar = () => (
  <StyledSoftStar viewBox="0 0 276 276" xmlns="http://www.w3.org/2000/svg">
    <SoftStartPath d="M135.31 272.611C135.689 275.796 140.311 275.796 140.69 272.611L145.032 236.018C150.693 188.308 188.308 150.693 236.018 145.032L272.61 140.69C275.797 140.311 275.797 135.689 272.61 135.31L236.018 130.968C188.308 125.307 150.693 87.6918 145.032 39.9823L140.69 3.38968C140.311 0.20343 135.689 0.2034 135.31 3.38977L130.968 39.9823C125.307 87.6918 87.6918 125.307 39.9819 130.968L3.38928 135.31C0.203558 135.689 0.203523 140.311 3.38938 140.69L39.9819 145.032C87.6918 150.693 125.307 188.308 130.968 236.018L135.31 272.611Z" />
  </StyledSoftStar>
);