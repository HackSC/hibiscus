import { useEffect, useRef } from 'react';
import styled from 'styled-components'

export function Slider() {
    const ref = useRef<any>(null);


    useEffect(() => {
      if (ref.current != null){
        const slider = ref.current;
        console.log(slider);
        const min = slider.min
        const max = slider.max
        const value = slider.value
        slider.style.background = `linear-gradient(to right, #307C93 0%, #307C93 ${(value-min)/(max-min)*100}%, #565656 ${(value-min)/(max-min)*100}%, #565656 100%)`

        slider.oninput = function() {
          this.style.background = `linear-gradient(to right, #307C93 0%, #307C93 ${(this.value-this.min)/(this.max-this.min)*100}%, #565656 ${(this.value-this.min)/(this.max-this.min)*100}%, #565656 100%)`
      };
      };
      
    }, []);
    return (
            <StyledSlider min="0" max="60" ref={ref}  id="myinput" type="range"/>
    );
  }

  const StyledSlider = styled.input`
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 200px;
  height: 10px; /* Specified height */
  background: linear-gradient(to right, #307C93 0%, #307C93 50%, #565656 50%, #565656 100%);
  outline: none; /* Remove outline */
  opacity: 1; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
  border-radius: 5px;  
  /* background-color:#307C93; */
  border: 2px solid #307C93;

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #76D3EF; /* Green background */
  border-radius: 50%;
  border: 2px solid #307C93;
  cursor: pointer; /* Cursor on hover */
}

::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #76D3EF; /* Green background */
  border-radius: 50%;
  border: 2px solid #307C93;
  cursor: pointer; /* Cursor on hover */

}
  `