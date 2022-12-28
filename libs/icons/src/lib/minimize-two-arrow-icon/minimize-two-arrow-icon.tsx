import { ImgHTMLAttributes } from 'react';
import Min2 from '../../assets/minimize-2.svg';

/* eslint-disable-next-line */
export interface MinimizeTwoArrowIconProps
  extends ImgHTMLAttributes<HTMLImageElement> {}

export function MinimizeTwoArrowIcon(props: MinimizeTwoArrowIconProps) {
  return <img src={Min2} {...props} alt={props.alt ?? 'Maximize item'} />;
}

export default MinimizeTwoArrowIcon;
