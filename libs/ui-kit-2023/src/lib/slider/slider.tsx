import { useEffect, useId, useRef } from 'react';
import styled from 'styled-components';

export interface SliderProps {
  min: number;
  max: number;
  step: number;
  onInput: (value: number) => void;
}

/**
 * A slider component for collecting data
 *
 * @param min minimum value on slider
 * @param max max value on slider
 * @param step how many steps should there be on slider
 * @param onInput callback function called when user drags the slider; `value` is the value of the slider at the moment. This callback is called at the last thing in the `oninput`
 */
export function Slider({ min, max, step, onInput }: SliderProps) {
  // TODO: handle spurious cases like max<0, min<0, min>=max
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;
    // change the background of the left to be colored and right to be gray
    slider.oninput = function () {
      const valueNumber = Number.parseFloat(slider.value);
      const leftGradientPercentBg = ((valueNumber - min) / (max - min)) * 100;
      slider.style.background = `linear-gradient(to right, #307C93 0%, #307C93 ${leftGradientPercentBg}%, #565656 ${leftGradientPercentBg}%, #565656 100%)`;
      onInput(valueNumber);
    };
  }, [max, min, ref]);

  return (
    <StyledSlider
      min={min}
      max={max}
      step={step}
      ref={ref}
      id={id}
      type="range"
    />
  );
}

const StyledSlider = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 200px;
  height: 10px; /* Specified height */
  background: linear-gradient(
    to right,
    #307c93 0%,
    #307c93 50%,
    #565656 50%,
    #565656 100%
  );
  outline: none; /* Remove outline */
  opacity: 1; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  border-radius: 5px;
  /* background-color:#307C93; */
  border: 2px solid #307c93;

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  ::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #76d3ef; /* Green background */
    border-radius: 50%;
    border: 2px solid #307c93;
    cursor: pointer; /* Cursor on hover */
  }

  ::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #76d3ef; /* Green background */
    border-radius: 50%;
    border: 2px solid #307c93;
    cursor: pointer; /* Cursor on hover */
  }
`;
