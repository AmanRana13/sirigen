import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const caregiverStrainSectionStyles = makeStyles()(() => ({
  tableContainer: {
    borderRadius: '10px',
    border: 'solid 1px rgba(0, 0, 0, 0.25)',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#fff',
    marginBottom: '30px',
    paddingBottom: '30px',
  },
  table: {
    borderCollapse: 'collapse',
    position: 'relative',
    '&  th': {borderBottom: '1px solid #c9c9c9'},
    '& tbody': {
      '&  th': {border: 0},
    },
  },
  tableHeading: {
    ...TemplateTypography.regular,
    fontWeight: 500,
    color: '#000',
    textAlign: 'center',
    padding: 5,
  },
  CGNameSection: {
    ...TemplateTypography.regular,
    width: 845,
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 20px 30px',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff',
  },

  tableContent: {
    paddingLeft: 30,
    ...TemplateTypography.regular,
    width: '1427px',
    marginRight: 145,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 60,
  },
  container: {
    padding: '30px',
  },
  radioGroupHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '650px',
    paddingBottom: '10px',
  },
  radioGroup: {
    width: '600px',
    paddingLeft: 40,
    marginLeft: 30,
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'space-between',
    '& label': {
      margin: 0,
    },
  },
  '@media print': {
    section: {
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    },
  },
  statsValueSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 650,
    padding: '0 36px',
  },
  statsTableContainer: {
    borderRadius: '10px',
    border: '1px solid #c9c9c9',
    backgroundColor: '#fff',
  },
  statsHeader: {
    ...TemplateTypography.regular,
    fontWeight: 500,
    color: '#000',
    padding: 18,
  },
  statsTable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsText: {
    ...TemplateTypography.regular,
    padding: '18px 36px',
  },
}));
