import {makeStyles} from 'tss-react/mui';

export const remainingCharacterStyle = makeStyles()((theme: any) => ({
  characterLimit: {
    color: theme.palette.customColor
      ? theme.palette.customColor.red
      : theme.palette.error.light,
    fontWeight: 'bold',
  },
}));
