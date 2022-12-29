import { ImgHTMLAttributes } from 'react';
import Max2 from '../../assets/maximize-2.svg';

/* eslint-disable-next-line */
export interface MaximizeTwoArrowIconProps
  extends ImgHTMLAttributes<HTMLImageElement> {}

export function MaximizeTwoArrowIcon(props: MaximizeTwoArrowIconProps) {
  return <img src={Max2} {...props} alt={props.alt ?? 'Maximize item'} />;
}

export default MaximizeTwoArrowIcon;
