/* eslint-disable max-len */
import {makeStyles} from 'tss-react/mui';
import {fontSizes, TemplateTypography} from 'common/Print/Print.utility';

export const medicalConditionTemplateStyles = makeStyles<{
  indexWidth?: string | number;
}>()((theme: any, {indexWidth}) => ({
  container: {},
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
    ...TemplateTypography.regular,
    fontSize: fontSizes.subHeading2,
    fontWeight: 600,
    textAlign: 'right',
    marginRight: '10px',
    width: `${indexWidth || 0}em`,
    color: '#0186a5',
  },
  '@media print': {
    listItem: {
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    },
  },
}));
