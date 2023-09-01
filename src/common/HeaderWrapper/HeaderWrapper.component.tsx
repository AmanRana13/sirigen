import React, {useState} from 'react';
import {Tabs, Tab, Box, Typography} from '@mui/material';
import {withStyles} from 'tss-react/mui';

import {headerWrapperStyle} from './HeaderWrapper.style';
import {IHeaderTabs} from './HeaderWrapper.types';

const NavTabs = withStyles(
  (props: any) => <Tabs {...props} />,
  () => ({
    root: {
      width: '100%',
      paddingBottom: 2,
      marginBottom: 4,
      borderBottom: `4px solid #00a9cf`,
    },
    indicator: {
      display: 'none',
    },
  }),
);

const StyledNavTab = withStyles(Tab, (_theme, _params, classes) => ({
  root: {
    minWidth: 90,
    maxWidth: 152,
    minHeight: 47,
    border: 'solid 1px #00a9cf',
    marginRight: 7,
    textTransform: 'none',
    [`&.${classes.selected}`]: {
      color: '#fff',
      backgroundColor: '#00A9CF',
    },
  },
  selected: {},
}));

const NavTab = (props: any) => <StyledNavTab disableRipple {...props} />;

const TabPanel = (props: any) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const HeaderWrapper = ({navTabs}: IHeaderTabs) => {
  const {classes} = headerWrapperStyle();

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <NavTabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        aria-label='full width tabs example'>
        {navTabs.map((data, key) => {
          return (
            <NavTab
              key={data.label}
              value={key}
              id={`tab-${key}`}
              label={
                <Box className={classes.navigationTabs}>
                  <Typography variant='h2'>{data.label}</Typography>
                </Box>
              }
            />
          );
        })}
      </NavTabs>
      {navTabs.map((tabs, index: number) => {
        return (
          <TabPanel value={value} index={index} key={tabs.label}>
            <tabs.component />
          </TabPanel>
        );
      })}
    </>
  );
};

export default HeaderWrapper;
