import {VITAL_CONDITION_CLASSNAME} from 'globals/enums';
import {makeStyles} from 'tss-react/mui';

export const ResidentDetailsCardStyle = makeStyles()((theme: any) => ({
  userCardOuterContainer: {
    background: theme.palette.background.default,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.33)',
    borderRadius: '16px',
    width: '235px',
    height: 'fit-content',
    '@media (max-width: 1919px)': {
      width: '195px',
    },
  },
  userCardContainer: {
    padding: '11px',
  },
  titleContainer: {
    alignItems: 'center',
  },
  icon: {
    height: '18px',
    width: '18px',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    color: theme.palette.customColor.titleBlack,
  },
  conditionContainer: {
    width: '100%',
    padding: '0 10px',
    height: '60px',
    margin: '12px auto 20px auto',
    borderRadius: '10px',
    border: `solid 4px ${theme.palette.customColor.borderGrey}`,
    backgroundColor: theme.palette.customColor.white,
    justifyContent: 'center',
    alignItems: 'center',
    [`&.${VITAL_CONDITION_CLASSNAME.GREY}`]: {
      borderColor: theme.palette.customColor.disabledRemove,
    },
    [`&.${VITAL_CONDITION_CLASSNAME.RED}`]: {
      borderColor: theme.palette.error.main,
    },
    [`&.${VITAL_CONDITION_CLASSNAME.GREEN}`]: {
      borderColor: theme.palette.success.main,
    },
    [`&.${VITAL_CONDITION_CLASSNAME.YELLOW}`]: {
      borderColor: theme.palette.zoneVimient.main,
    },
  },
  condition: {
    color: theme.palette.customColor.titleBlack,
    fontSize: '30px',
    fontWeight: 'normal',
    '@media (max-width: 1920px)': {
      fontSize: '26px',
    },
  },
  value: {
    color: theme.palette.customColor.titleBlack,
    fontWeight: 'normal',
  },
  valueTitle: {
    span: {
      color: theme.palette.customColor.titleBlack,
      '@media (max-width: 1920px)': {
        fontSize: '16px',
      },
    },
  },
  view: {
    height: '36px',
    backgroundColor: theme.palette.customColor.primaryGreen,
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
    justifyContent: 'end',
    alignItems: 'center',
    paddingRight: '22px',
    '& p': {
      textDecoration: 'underline',
      color: theme.palette.customColor.white,
      cursor: 'pointer',
    },
  },
}));
