import {makeStyles} from 'tss-react/mui';

export const medicalConditionSectionStyles = makeStyles()((theme: any) => ({
  section: {
    width: '100%',
    ...theme.customTypography.normal,
  },
  header: {
    display: 'flex',
    width: '100%',
    marginBottom: '20px',
  },
  heading: {
    ...theme.customTypography.heading,
    color: `${theme.palette.customColor.primaryLight}`,
    lineHeight: 0.88,
    flexGrow: 1,
  },
  severity: {
    width: '360px',
    display: 'flex',
    textTransform: 'capitalize',
  },
  date: {
    width: '320px',
    display: 'flex',
    textTransform: 'capitalize',
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
  notes: {},
}));
