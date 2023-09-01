import {makeStyles} from 'tss-react/mui';

export const goalsStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '35px 23px 30px 27px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #d3d3d3',
    backgroundColor: theme.palette.customColor.white,
    height: '1112px',
    marginTop: '24px',
  },
  goalsHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  goalsTableHeading: {
    color: '#0186a5',
    margin: '5px 0px 0px 0px',
  },
  tableContainer: {
    height: '960px',
    '&::-webkit-scrollbar': {
      width: 8,
      height: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#00a9cf',
      borderRadius: 4,
    },
  },
  tableBtn: {
    fontSize: '16px',
    padding: '0px',
    borderBottom: '1px solid #707070',
  },
  tableHeadCell: {
    fontSize: '14px',
    color: theme.palette.customColor.black,
    padding: '0px 0px 16px 0px',
    borderBottom: '1px solid #707070',
    fontWeight: 800,
  },
  tableBodyCell: {
    fontSize: '16px',
    color: theme.palette.customColor.black,
    padding: '10px 28px 10px 0',
    borderBottom: '1px solid #707070',
    position: 'relative',
  },
  addGoalButton: {
    borderRadius: '19px',
    padding: '7px 34px 8px',
    backgroundColor: '#a7a7a7',
    boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)',
    fontSize: '16px',
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
  notesTextField: {
    fontSize: '16px',
    border: '1px solid #cbcbcb',
    margin: '9px 0 8px 0px',
    borderRadius: '10px',
    background: '#fafafa',
    padding: 7,
  },
  saveGoalButton: {
    borderRadius: '19px',
    padding: '7px 34px 8px',
    backgroundColor: '#00a9cf',
    boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)',
    fontSize: '16px',
  },
  noData: {
    borderBottom: 'none',
    height: '20vh',
    textAlign: 'center',
  },
  removeIcon: {
    color: '#00a9cf',
    cursor: 'pointer',
    display: 'flex',
    alignSelf: 'center',
    marginLeft: 5,
    width: '40px',
    height: '40px',
  },
  removeIconDisable: {
    color: '#A7A7A7!important',
    pointerEvents: 'none',
  },
  progress: {
    width: 120,
    height: 38,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#00a9cf',
    borderRadius: '19px',
  },
  progressBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '634.8px',
    height: '84px',
    marginTop: '10px',
    paddingTop: 7,
    borderRadius: '10px',
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.1)',
    border: 'solid 1px #bab8b8',
    backgroundColor: '#fff',
  },
  slider: {
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 14,
      background: 'unset',
      padding: 0,
      width: 26,
      height: 26,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#00a9cf',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -70%) rotate(-45deg) scale(0)',
      '&:before': {display: 'none'},
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -70%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
    '& .css-138wvww-MuiSlider-markLabel': {
      top: '75%',
    },
    '& .css-n90i7g-MuiSlider-markLabel ': {
      top: '75%',
    },
    '& .css-avskhy-MuiSlider-thumb': {
      width: '14px',
      height: '14px',
    },
    '& .css-1gv0vcd-MuiSlider-track': {
      height: '1px',
    },
    '& .css-7bopvk-MuiSlider-markLabel': {
      fontSize: 14,
    },
    '& .css-1h8lnig-MuiSlider-markLabel': {
      fontSize: 14,
    },
  },
}));
