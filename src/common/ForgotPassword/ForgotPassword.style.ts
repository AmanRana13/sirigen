import {makeStyles} from 'tss-react/mui';

export const ForgotPasswordStyle = makeStyles()((theme: any) => ({
  forgotPassword: {
    '& a': {
      color: theme.palette.customColor.grey,
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
}));
