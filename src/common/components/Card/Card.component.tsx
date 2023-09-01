import React, {useMemo} from 'react';
import {makeStyles} from 'tss-react/mui';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, CircularProgress} from '@mui/material';
import clsx from 'clsx';

export const useStyles = makeStyles()((theme: any) => ({
  stretch: {
    minHeight: 'fit-content',
    height: '100%',
    '& > div': {
      minHeight: 'fit-content',
      height: '100%',
      '& > div': {
        minHeight: 'fit-content',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& > div:nth-of-type(2)': {
          flexGrow: 1,
        },
      },
    },
  },
  root: {
    border: 0,
    backgroundColor: theme.palette.common.white,
    borderRadius: 17,
    boxShadow: `0 4px 19px ${theme.palette.customColor.boxShadow}`,
  },
  title: {
    color: theme.palette.customColor.lighterBlack,
    textTransform: 'uppercase',
    fontSize: 18,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  children: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    color: theme.palette.customColor.primaryGreen,
    fontSize: 17,
    fontWeight: 400,
  },
}));

interface ISimpleCardProps {
  title?: any;
  subTitle?: string;
  children: React.ReactNode;
  mt?: number;
  isLoading?: boolean;
  noRecordFound?: boolean;
  stretch?: boolean;
  style?: any;
  showBorder?: boolean;
  childrenClass?: any;
  CardContentStyle?: any;
}

const SimpleCard = ({
  title,
  subTitle,
  children,
  mt,
  isLoading,
  noRecordFound,
  stretch = false,
  style,
  childrenClass,
  CardContentStyle,
}: ISimpleCardProps) => {
  const {classes} = useStyles();

  const cardData = useMemo(() => {
    if (isLoading) {
      return <CircularProgress />;
    } else if (noRecordFound) {
      return <div>No Records Found</div>;
    } else return children;
  }, [isLoading, noRecordFound, children]);

  return (
    <Box
      mt={mt}
      data-testid='simpleCard'
      className={clsx({
        [classes.stretch]: stretch,
      })}>
      <Card className={classes.root} style={style}>
        <CardContent style={CardContentStyle}>
          <Box className={classes.headerContainer}>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom>
              {title}
            </Typography>
            <Typography
              className={classes.subTitle}
              color='textSecondary'
              gutterBottom>
              {subTitle}
            </Typography>
          </Box>
          <Box
            className={clsx(classes.children, {
              [childrenClass]: childrenClass,
            })}>
            {cardData}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export {SimpleCard as Card};
