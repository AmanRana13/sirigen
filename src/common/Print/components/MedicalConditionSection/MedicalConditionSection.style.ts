import {makeStyles} from 'tss-react/mui';
import {fontSizes, TemplateTypography} from 'common/Print/Print.utility';

export const medicalConditionSectionStyles = makeStyles()(() => ({
  section: {
    width: '100%',
    ...TemplateTypography.regular,
    fontSize: fontSizes.regular2,
  },
  header: {
    display: 'flex',
    width: '100%',
    marginBottom: '30px',
  },
  heading: {
    ...TemplateTypography.regular,
    fontSize: fontSizes.subHeading2,
    fontWeight: 600,
    maxWidth: '1080px',
    color: '#0186a5',
    flexGrow: 1,
  },
  severity: {
    width: '540px',
    display: 'flex',
    textTransform: 'capitalize',
    lineHeight: 1.25,
  },
  date: {
    width: '512px',
    display: 'flex',
    textTransform: 'capitalize',
    lineHeight: 1.25,
  },
  label: {
    fontWeight: 600,
    marginRight: '10px',
  },
  notesContainer: {
    display: 'flex',
  },
  notesLabel: {
    fontWeight: 600,
    marginRight: '10px',
  },
}));
