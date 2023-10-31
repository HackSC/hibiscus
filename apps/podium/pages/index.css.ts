import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
});

globalStyle('body', {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
});

export const containerMain = style({
  padding: '12px',
  paddingTop: '28px'
});

export const header = style({
  backgroundColor: '#002990',
  padding: '12px',
});

export const projectPreview = style({
  backgroundColor: '#A9A9A9',
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

export const rankBasic = style({
  marginRight: '20px',
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
  position: 'absolute',
  left: 0, right: 0, top: 0, bottom: 0,
  width: '90%',
  margin: 'auto',
  height: 'fit-content',
  backgroundColor: '#FFFFFF',
  color: 'black',
  zIndex: 888,
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
});

export const detailsImg = style({
  display: 'block',
  width: '100%',
  height: '183px',
  position: 'relative',
  backgroundColor: '#A9A9A9',
});

export const detailsButtons = style({
  position: 'absolute',
  top: '16px',
  right: '16px'
});

export const detailsInfo = style({
  padding: '25px',
  position: 'relative',
});

globalStyle(`${detailsInfo} h3`, {
  fontWeight: 400,
  fontSize: '14px',
  color: '#989898',
  margin: '10px 0px',
});

export const backgroundBlur = style({
  backdropFilter: 'blur(15px)',
  width: '100%',
  height: '100%',
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

export const onHoldStack = style({
  paddingTop: '71px',
});

export const onHoldPreview = style({
  height: '92px',
  marginTop: '-71px',
  backgroundColor: 'darkgray',
  color: 'white',
  listStyle: 'none',
  position: 'relative',
});

export const onHoldStackExpanded = style({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
});

export const truncateText = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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

export const boxShadowY = style({
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)',
});

export const width90 = style({
  width: '90%',
})

export const marginLeft12 = style({
  marginLeft: '12px',
});

globalStyle('a', {
  textDecoration: 'inherit',
  color: 'inherit',
});

globalStyle('ul', {
  padding: 0,
  listStyle: 'none',
});

globalStyle('button', {
  border: 'none',
  font: 'inherit',
  cursor: 'pointer',
  backgroundColor: '#002990',
  color: '#FFFFFF',
  padding: '8px 16px',
  borderRadius: '8px',
});