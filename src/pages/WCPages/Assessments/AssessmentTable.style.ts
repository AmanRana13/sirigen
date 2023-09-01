import {makeStyles} from 'tss-react/mui';

export const assessmentStyle = makeStyles()(() => ({
  tableContainer: {
    border: '1px solid #c9c9c9',
    borderRadius: 10,
    marginBottom: 30,
  },
  table: {
    borderCollapse: 'collapse',
    minWidth: 650,
    position: 'relative',
    '& th,td': {
      fontSize: 16,
    },
    '& tbody': {
      '& tr:last-child td, tr:last-child th': {border: 0},
      '& tr:nth-of-type(even)': {
        backgroundColor: '#f4fbfd',
      },
    },
  },
  tableHeadingText: {color: '#0186a5', fontWeight: 500, fontSize: 20},
  secondAbsoluteRow: {
    position: 'absolute',
    top: 4,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  radioField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& label': {
      margin: 0,
    },
  },
  incomplete: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 500,
    justifyContent: 'center',
    color: '#CC0000',
    '& img': {
      marginRight: 10,
    },
  },
  dateTime: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  tableText: {
    color: '#000',
  },
  errorText: {
    color: '#CC0000',
  },
  inputFieldArrowIcon: {
    color: '#00a9cf',
    fontSize: 30,
    top: 0,
    height: 40,
  },
  dropDown: {
    width: '258px',
    height: '36px',
    '& [class*="MuiOutlinedInput-notchedOutline"]': {
      borderColor: '#eaf8f7 !important',
    },
  },
  note: {
    alignItems: 'center',
    fontSize: 14,
  },
  assessmentTitle: {
    fontSize: 20,
    color: '#0186a5',
    fontWeight: 'bold',
  },
  optionsRadioField: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& label': {
      margin: 0,
    },
  },
  infoIcon: {
    paddingRight: 5,
    paddingTop: 3,
    width: '18px',
    height: '18px',
  },
}));
