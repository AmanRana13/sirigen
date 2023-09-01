import {makeStyles} from 'tss-react/mui';
import {wellnessTableDimensions} from './WellnessSurvey.action';

export const emotionalSurveyStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
  },
  rootContainer: {
    padding: '0px 11px 10px 11px',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFF',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    overflowX: 'auto',
  },
  tableContainer: {
    //overflowY: 'auto',
    height: '100%',
    '@media (min-width: 1740px)': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  headerTitle: {
    marginTop: 10,
    marginRight: 20,
  },
  searchRangeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonContainer: {
    marginTop: 10,
    '@media (max-width: 1420px)': {
      marginTop: 22,
    },
  },
  table: {
    backgroundColor: '#fff',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    '& td:first-child,th:first-child': {
      minWidth: 179,
    },

    //wellness score border style start
    '& td:last-child,th:last-child': {
      borderRight: `4px solid #707070`,
      borderLeft: `4px solid #707070`,
    },
    '& th:last-child': {
      borderTop: `4px solid #707070`,
    },
    '& tr:last-child td:last-child': {
      borderRight: `4px solid #707070`,
      borderLeft: `4px solid #707070`,
      borderBottom: `4px solid #707070`,
    },


    '& td,th': {
      border: '1px solid #707070',
      minWidth: 90,
    },
    '&.responseTableRow': {
      '& td': {
        position: 'relative',
        height: 35,
        padding: 5,
        textAlign: 'center',
      },
    },
    '& td': {
      position: 'relative',
      height: wellnessTableDimensions.oneRowHeight,
      padding: 5,
      textAlign: 'center',
    },
    '& th': {
      height: 90,
    },
  },
  positive: {
    backgroundColor: '#48B67B',
    color: '#fff',
  },
  negative: {
    backgroundColor: '#F8B848',
    color: '#fff',
  },
  commentIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
  },
  tooltip: {
    backgroundColor: '#FFF074',
    //border: 'solid 1px #000',
    color: '#000',
  },
  customArrow: {
    color: '#FFF074',
    '&:before': {
      //border: '1px solid #000',
    },
  },
  clearButton: {
    width: 117,
    borderRadius: 20,
    padding: '6px 30px',
    backgroundColor: theme.palette.customColor.primary,
  },
  subContainer: {
    display: 'flex',
    marginTop: 32,
    //marginBottom: 32,
    //overflow: 'scroll',
  },
  red: {
    backgroundColor: '#DA552E',
  },
  yellow: {
    backgroundColor: '#F8B848',
  },
  green: {
    backgroundColor: '#48B67B',
  },
}));
