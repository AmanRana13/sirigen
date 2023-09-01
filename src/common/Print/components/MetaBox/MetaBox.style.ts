import {makeStyles} from 'tss-react/mui';
import {TemplateTypography} from 'common/Print/Print.utility';

export const metaBoxStyles = makeStyles()(() => ({
  container: {
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff',
    margin: '0 144px',
    gap: '36px',
  },
}));

export const detailStyles = makeStyles()(() => ({
  firstLabel: {
    ...TemplateTypography.regular,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#000',
  },
  secondLabel: {
    ...TemplateTypography.regular,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#000',
  },
  detailText: {
    ...TemplateTypography.regular,
    textAlign: 'left',
    color: '#000',
    wordBreak: 'break-word',
  },
}));
