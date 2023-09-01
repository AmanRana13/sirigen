import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {withStyles} from 'tss-react/mui';
import {makeStyles} from 'tss-react/mui';

export const tabPanelStyle = makeStyles()((theme: any) => ({
  tabPanel: {
    width: theme.cardMaxWidth,
  },
}));

const NavTabs = withStyles(
  (props: any) => <Tabs {...props} />,
  () => ({
    root: {
      width: 850,
      margin: '0 auto',
      marginBottom: 10,
    },
    indicator: {
      display: 'none',
    },
  }),
);

const StyledNavTab = withStyles(Tab, (_theme, _params, classes) => ({
  root: {
    minWidth: 90,
    maxWidth: 110,
    textTransform: 'none',
    padding: '12px 0px',
    '&:hover': {},
    [`&.${classes.selected}`]: {
      color: '#0087A6',
      '& .MuiBox-root > div': {
        width: 80,
        height: 80,
        backgroundColor: '#00A9CF',
      },
      '& img': {
        width: 60,
        height: 60,
      },
    },
    '&:focus': {},
  },
  selected: {},
}));

const NavTab = (props: any) => <StyledNavTab disableRipple {...props} />;

const TabPanel = (props: any) => {
  const {classes} = tabPanelStyle();
  const {children, value, index, ...other} = props;

  return (
    <div
      className={classes.tabPanel}
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      data-testid='tabs-component'
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export {NavTabs, NavTab, TabPanel};
