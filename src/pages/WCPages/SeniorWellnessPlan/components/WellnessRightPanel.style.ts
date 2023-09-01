import {makeStyles} from 'tss-react/mui';

export const wellnessRightPanelStyle = makeStyles()((theme: any) => ({
  rightSideFieldsContainer: {
    backgroundColor: theme.palette.customColor.white,
    borderRadius: 16,
    position: 'relative',
    padding: 30,
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.16)',
    margin: '21px 0px 0 0',
    display: 'flex',
    flexDirection: 'column',
    height: 360,
  },
  fieldsHeading: {
    color: '#0186a5',
    margin: '5px 0px 0px 0px',
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
  textFieldDesign: {
    display: 'flex',
    fontSize: '16px',
    border: '1px solid #cbcbcb',
    margin: '9px 0 8px 0px',
    borderRadius: '10px',
    background: '#fafafa',
    padding: 7,
  },
  AddButton: {
    borderRadius: '19px',
    padding: '7px 34px 8px',
    backgroundColor: '#00a9cf',
    boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)',
    fontSize: '16px',
  },
  removeIcon: {
    color: '#00a9cf',
    cursor: 'pointer',
    display: 'flex',
    alignSelf: 'center',
    width: '35px',
    height: '35px',
    marginLeft: 22,
  },
  removeIconDisable: {
    color: '#A7A7A7!important',
    pointerEvents: 'none',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '15px 0 16px 0',
    marginTop: 50,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#00a9cf',
      borderRadius: 4,
    },
  },
  itemData: {
    display: 'flex',
    width: '100%',
    marginBottom: 24,
  },
}));
