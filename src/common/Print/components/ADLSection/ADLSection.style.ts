import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const adlSectionStyles = makeStyles()(() => ({
  section: {
    borderRadius: '10px',
    border: '1px solid #707070',
    backgroundColor: '#fff',
    marginBottom: '30px',
  },
  header: {
    padding: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    borderBottom: '1px solid #707070',
  },
  heading: {
    ...TemplateTypography.regular,
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: 0.66,
    color: '#0186a5',
  },
  radioGroup: {
    '& > *': {
      margin: '12px 0',
      display: 'flex',
      alignItems: 'flex-start',
    },
    '&:first-child': {
      marginTop: '0',
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
  '@media print': {
    section: {
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    },
  },
}));
