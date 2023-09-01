import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const holisticSectionStyles = makeStyles()(() => ({
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
  tableHeading: {
    ...TemplateTypography.regular,
    fontWeight: 500,
    lineHeight: 0.73,
    color: '#000',
  },
  tableContent: {
    ...TemplateTypography.regular,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '30px',
  },
  container: {
    padding: '30px',
  },
  radioGroupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '520px',
    paddingBottom: '10px',
  },
  radioGroup: {
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
}));
