import {makeStyles} from 'tss-react/mui';

export const WellnessLeftPanelStyle = makeStyles()((theme: any) => ({
  leftSideFieldsContainer: {
    backgroundColor: theme.palette.customColor.white,
    borderRadius: 16,
    height: 740,
    padding: '30px 40px',
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.16)',
    margin: '21px 23px 0 0',
    display: 'flex',
    flexDirection: 'column',
  },
  fieldsHeading: {
    color: '#0186a5',
    margin: '5px 0px 0px 0px',
  },

  errorText: {
    color: theme.palette.customColor.error,
  },
  textFieldDesign: {
    fontSize: '16px',
    border: '1px solid #cbcbcb',
    margin: '9px 0 8px 0px',
    borderRadius: '10px',
    background: '#fafafa',
    padding: 7,
  },
}));
