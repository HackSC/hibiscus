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
  padding: '12px',
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

export const detailsContainer = style({
  position: 'fixed',
  top: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  zIndex: 333,
});

export const detailsProject = style({
  width: '100%',
  margin: '12px',
  height: 'fit-content',
  backgroundColor: 'white',
  color: 'black',
  position: 'absolute',
  zIndex: 888,
  top: '30%',
});

export const detailsImg = style({
  display: 'block',
  width: '100%',
  height: '183px',
  position: 'relative',
});

export const detailsClose = style({
  position: 'absolute',
  top: '16px',
  right: '16px'
});

export const detailsInfo = style({
  padding: '25px',
});

export const backgroundBlur = style({
  backdropFilter: 'blur(15px)',
  width: '100%',
  height: '100%',
});

export const rankBasic = style({
  marginRight: '20px',
});

export const dragToOnHold = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100%',
  height: '147px',
  backgroundColor: '#002990',
  color: '#FFFFFF'
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

export const truncateText = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

export const truncate = style({
  display: '-webkit-box',
  WebkitLineClamp: 'var(--line-clamp, 3)',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  hyphens: 'auto',
  textAlign: 'left',
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
  zIndex: 9,
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
