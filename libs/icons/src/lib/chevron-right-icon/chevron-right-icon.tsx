import Arrow from '../../assets/chevron-right.svg';

/* eslint-disable-next-line */
export interface ChevronRightIconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function ChevronRightIcon(props: ChevronRightIconProps) {
  return (
    <img
      src={Arrow}
      {...props}
      alt={props.alt ?? 'Chevron-like arrow icon pointing tip to the right'}
    />
  );
}

export default ChevronRightIcon;
