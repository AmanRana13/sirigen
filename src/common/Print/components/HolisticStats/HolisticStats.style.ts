import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const holisticStatsStyles = makeStyles()(() => ({
  heading: {
    ...TemplateTypography.regular,
    fontWeight: 500,
    lineHeight: 1,
    padding: '36px',
    maxWidth: '332px',
    minWidth: '332px',
    width: '330px',
    verticalAlign: 'top',
    textAlign: 'center',
  },
  container: {
    '@media print': {
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    },
  },
  tableContainer: {
    borderRadius: '10px',
    border: '1px solid #c9c9c9',
    backgroundColor: '#fff',
    marginBottom: '30px',
    '&:last-of-type': {
      marginBottom: 'none',
    },
  },
  content: {
    ...TemplateTypography.regular,
    textAlign: 'center',
  },
  totalScore: {
    ...TemplateTypography.regular,
    padding: '30px',
    borderRadius: '10px',
    border: 'solid 1px #c9c9c9',
    marginTop: '30px',
    '& > span': {
      fontWeight: 500,
      lineHeight: 0.72,
      whiteSpace: 'nowrap',
    },
  },
}));
