import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
});

globalStyle('body', {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
});

export const containerMain = style({
  padding: '12px',
});

globalStyle(`${containerMain} h1`, {
  marginLeft: '12px',
});

export const header = style({
  backgroundColor: '#002990',
  padding: '8px',
});

export const projectPreview = style({
  backgroundColor: 'darkgray',
  color: 'white',
  marginBottom: '13px',
  height: '92px',
  paddingLeft: '33px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  listStyle: 'none',
  position: 'relative',
});

globalStyle(`${projectPreview} h3`, {
  margin: 0,
  marginBottom: '8px',
  width: 'fit-content',
});

export const backgroundDim = style({
  backdropFilter: 'blur(15px)',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  zIndex: 1,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export const rankBasic = style({
  marginRight: '20px',
});

export const onHoldPreview = style({
  width: '370px',
  height: '92px',
});

export const onHoldPreviewFull = style({
  width: '370px',
  height: '192px',
});

export const onHoldStack = style({
  display: 'grid',
  justifyContent: 'center',
  gridTemplateRows: 'repeat(3, 27px)',
});

export const onHoldStackExpanded = style({
  display: 'grid',
  justifyContent: 'center',
  gridTemplateRows: 'auto 1fr auto',
});

export const onHoldItem = style({
  width: '3em',
  height: '3em',
  padding: '3px',
  margin: '2px',
  backgroundColor: 'red',
  borderStyle: 'solid',
  transform: 'rotate(33deg)',
});

export const truncateText = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

export const containerSlideroom = style({
  backgroundColor: '#DDD8D8',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

export const slideroomHeader = style({
  backgroundColor: '#FFFFFF',
  width: '100%',
  padding: '20px 25px',
  boxSizing: 'border-box',
});

globalStyle(`${slideroomHeader} h1`, {
  fontSize: '18px',
});

export const truncate = style({
  display: '-webkit-box',
  WebkitLineClamp: 'var(--line-clamp, 3)',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  hyphens: 'auto',
  textAlign: 'left',
});

export const spotlightContainer = style({
  width: '95%',
  display: 'block',
  margin: 'auto',
});

export const spotlight = style({
  width: '100%',
  height: '340px',
  backgroundColor: 'white',
  color: 'black',
});

export const spotlightInfo = style({
  padding: '20px',
});

globalStyle(`${spotlightInfo} h3`, {
  margin: 0,
  fontWeight: 400,
  fontSize: '16px',
});

globalStyle(`${spotlightInfo} p`, {
  fontSize: '13px',
  marginTop: '4px',
  marginBottom: '20px',
});

export const spotlightImg = style({
  display: 'block',
  width: '100%',
  height: '50%',
});

export const slideroomProjectBar = style({
  backgroundColor: 'white',
  minWidth: '100%',
  overflowX: 'scroll',
  whiteSpace: 'nowrap',
});

export const projectSlide = style({
  width: '139px',
  height: '75px',
  backgroundColor: 'lightgray',
  display: 'inline-block',
  margin: '4px',
  borderRadius: '10px',
  position: 'relative',
});

export const rankIcon = style({
  width: '25px',
  height: '25px',
  backgroundColor: 'gray',
  color: 'white',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'absolute',
  top: -5,
  left: -5,
});

export const hidden = style({
  display: 'none',
});

export const thinFont = style({
  fontWeight: 400,
});

export const heavyFont = style({
  fontWeight: 700,
});

export const zTop = style({
  zIndex: 999,
});

export const roundCorners = style({
  borderRadius: '20px',
  overflow: 'hidden',
});

export const flexStart = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const flexBetween = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const flexCenter = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle('a', {
  textDecoration: 'inherit',
  color: 'inherit',
});

globalStyle('ul', {
  padding: 0,
  listStyle: 'none',
});
