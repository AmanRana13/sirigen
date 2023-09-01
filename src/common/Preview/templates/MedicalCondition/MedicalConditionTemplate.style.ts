import {makeStyles} from 'tss-react/mui';

export const medicalConditionTemplateStyles = makeStyles<{
  indexWidth?: string | number;
}>()((theme: any, {indexWidth}) => ({
  container: {
    padding: '60px 144px',
  },
  listItem: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    marginBottom: '30px',
    paddingBottom: '30px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  listIndex: {
    ...theme.customTypography.heading,
    textAlign: 'right',
    marginRight: '10px',
    lineHeight: 0.88,
    width: `${indexWidth || 0}em`,
    color: `${theme.palette.customColor.primaryLight}`,
  },
}));
