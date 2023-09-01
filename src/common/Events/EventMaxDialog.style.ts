import {makeStyles} from 'tss-react/mui';

export const eventMaxDialogLayoutStyle = makeStyles<any>()(
  (theme: any, props) => ({
    alertDialog: {
      backgroundColor: `${theme.palette.customColor.alertHeader}!important`,
    },
    sosEventDialog: {
      height: '430px!important',
      width: '600px!important',
      //transform: 'translate(0%, 50%)!important',
      '& .MuiPaper-rounded': {
        borderRadius: 10,
        width: 600,
        padding: 0,
        margin: 0,
        border: `5px solid ${theme.palette.customColor.sosHeader}`,
      },
      '& .MuiDialog-scrollPaper': {
        display: 'block',
        position: 'relative',
        top: 20,
        bottom: 30,
        height: 'fit-content',
      },
    },
    eventDialog: {
      '& .MuiPaper-rounded': {
        borderRadius: 18,
        maxWidth: 750,
        padding: 0,
        margin: 0,
      },
      '& .MuiDialog-scrollPaper': {
        display: 'block',
        position: 'relative',
        top: 20,
        maxHeight: 1000,
      },
    },
    '@media screen and (max-height: 1000px )': {
      eventDialog: {
        '& .MuiDialog-scrollPaper': {
          display: 'block',
          position: 'relative',
          top: 20,
          height: '100vh',
        },
      },
    },
    dialogTitle: {
      backgroundColor: theme.palette.customColor.summaryHeader,
      padding: '6px 22px',
      textAlign: 'end',
    },
    sosDialogTitle: {
      backgroundColor: theme.palette.customColor.sosHeader,
      color: theme.palette.customColor.white,
      padding: '6px 20px',
      textAlign: 'end',
    },
    minimizeIcon: {
      lineHeight: 0,
      '& svg': {
        cursor: 'pointer',
      },
    },
    dialogTitleName: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    sosDialogTitleName: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dialogActions: {
      padding: 30,
    },
    sosDialogActions: {
      paddingTop: 1,
      paddingBottom: 30,
    },
    stackMargin: {
      left: `${props?.left}px!important`,
      top: `${props?.top}px!important`,
    },
    removeBackground: {
      width: 750,
      margin: '0 auto',
      height: 'fit-content',
      pointerEvents: 'none',
      '& .MuiBackdrop-root': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    navigateIcon: {
      position: 'relative',
      top: 12,
      cursor: 'pointer',
      marginLeft: 10,
    },
    sosNavigateIcon: {
      fontSize: 48,
      top: 0,
      position: 'relative',
      cursor: 'pointer',
      marginLeft: 4,
      marginRight: 0,
    },
    sosDialogName: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'end',
    },
  }),
);
