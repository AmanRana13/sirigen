import {makeStyles} from 'tss-react/mui';
import {MUThemeOptionsV2} from 'config/theme.config';

export const holisticAssessmentStyle = makeStyles()(
  (theme: MUThemeOptionsV2) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 25px 45px 25px',
      borderRadius: 16,
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
      border: `solid 1px ${theme.palette.grey.A100}`,
      backgroundColor: theme.palette.background.default,
    },
    holisticAssessmentHeading: {
      color: theme.palette.primary.main,
      marginBottom: 24,
      fontWeight: 500,
    },
    holisticAssessmentHeader: {
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 20,
      alignItems: 'baseline',
    },
    checkboxNotChecked: {
      color: '#000',
    },
    checkedCheckbox: {
      color: '#00a9cf !important',
    },
    incomplete: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 20,
      fontWeight: 500,
      justifyContent: 'center',
      color: '#cc0000',
      '& img': {
        marginRight: 10,
      },
      marginRight: 30,
    },
  }),
);
