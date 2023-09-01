import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const headerDataStyles = makeStyles()(() => ({
  headerData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    textAlign: 'right',
    gap: '36px',
  },
  heading: {
    ...TemplateTypography.heading,
    color: '#0186a5',
  },
  subheading: {
    ...TemplateTypography.subHeading,
    color: '#000',
  },
}));
