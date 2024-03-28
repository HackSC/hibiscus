import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  outline: 'none',
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
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  cursor: 'grab',
  selectors: {
    '&:h3': {
      margin: 0,
      marginBottom: '8px',
      width: 'fit-content',
    },
    '&:active': {
      cursor: 'grabbing',
    },
  }
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

export const containerSearch = style({
  backgroundColor: '#EDEDED',
  marginTop: '70px',
});

export const searchBar = style({
  backgroundColor: '#FFFFFF',
  border: 'none',
  padding: '16px',
  width: '100%',
});

export const searchResult = style({
  backgroundColor: '#FFFFFF',
  color: 'black',
  padding: '8px 16px',
  selectors: {
    '&:hover': {
      backgroundColor: '#BBBBBB',
      cursor: 'pointer',
    },
  },
});

export const detailsContainer = style({
  zIndex: 333,
});

export const detailsProject = style({
  margin: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
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
  right: '16px',
  cursor: 'pointer',
});

export const detailsInfo = style({
  padding: '25px',
  position: 'relative',
});

globalStyle(`${detailsInfo} h3`, {
  fontWeight: 400,
  fontSize: '14px',
  color: '#989898',
  margin: '10px 0px 12px 0px',
});

export const containerInstructions = style({
  margin: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
  padding: '30px',
  height: 'fit-content',
  backgroundColor: '#FFFFFF',
  color: 'black',
  zIndex: 888,
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
});

globalStyle(`${containerInstructions} h1`, {
  fontSize: '24px',
});

globalStyle(`${containerInstructions} h3`, {
  marginTop: '24px',
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
  backgroundColor: '#A9A9A9',
  color: 'white',
  listStyle: 'none',
  position: 'relative',
});

export const onHoldStackExpanded = style({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
});

export const containerComments = style({
  padding: '36px',
});

export const commentButton = style({
  borderRadius: '50%',
  backgroundColor: '#002990',
  width: '35px',
  height: '35px',
  padding: '15px',
  margin: '0px 25px 50px 0px',
  position: 'fixed',
  bottom: 0,
  right: 0,
  filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2))',
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

export const textCenter = style({
  textAlign: 'center',
})

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

export const cursorPointer = style({
  cursor: 'pointer',
})

export const boxShadowY = style({
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)',
});

export const width90 = style({
  width: '90%',
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