import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const fieldsStyle = makeStyles()(() => ({
  radioComponent: {
    '& svg': {
      width: '40px',
      height: '40px',
    },
  },
  labelStyle: {
    ...TemplateTypography.regular,
  },
}));
