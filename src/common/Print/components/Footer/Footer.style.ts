import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const footerStyles = makeStyles()(() => ({
  footer: {
    ...TemplateTypography.regular,
    textAlign: 'left',
    padding: '56px 144px',
    backgroundColor: '#ffffff',
    position: 'relative',
    borderTop: '1px solid #707070',
  },
}));
