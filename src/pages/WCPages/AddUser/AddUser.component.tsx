import {useState, useEffect} from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {useNavigate, useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';

import {NavTab, NavTabs, TabPanel} from 'common/Tabs';
import {BottomNavigation} from 'common/sections';
import CareCircleIcon from 'assets/icons/CareCircle.svg';
import DeviceInstallationIcon from 'assets/icons/DeviceInstallation.svg';
import MedicalInfoIcon from 'assets/icons/MedicalInfo.svg';
import ProviderInfoIcon from 'assets/icons/ProviderInfo.svg';
import SeniorInfoIcon from 'assets/icons/SeniorInfo.svg';

import Devices from './DeviceInstallation';
import ProfileInfo from 'pages/WCPages/AddUser/ProfileInfo';
import MedicalInfo from 'pages/WCPages/AddUser/MedicalInfo';
import CareGivers from 'pages/WCPages/AddUser/CareCircle';
import ProviderInfo from 'pages/WCPages/AddUser/ProviderInfo';
import SharedStorage from 'store/SharedStorage';
import {addUserStyle} from './AddUser.style';
import {Typography} from '@mui/material';
import RoleBaseRender from 'common/RoleBaseRender';
import {OnboardingTab, Roles} from 'globals/enums';

const AddUserComponent = ({isOnboardingInfo = false}: any) => {
  const {classes} = addUserStyle();

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const userRole = useAppSelector((state: any) => state.auth.userRole);

  const navTabs = [
    {
      label: 'Profile Info',
      roles: [Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM],
      icon: (
        <img
          alt='Profile Info'
          src={SeniorInfoIcon}
          className={classes.iconSize}
        />
      ),
    },
    {
      label: 'Provider Info',
      roles: [Roles.CareAgent],
      icon: (
        <img
          alt='Provider Info'
          src={ProviderInfoIcon}
          className={classes.iconSize}
        />
      ),
    },
    {
      label: 'Medical Info',
      roles: [Roles.CareAgent],
      icon: (
        <img
          alt='Medical Info'
          src={MedicalInfoIcon}
          className={classes.iconSize}
        />
      ),
    },
    {
      label: 'Care Circle',
      roles: [Roles.CareAgent],
      icon: (
        <img
          alt='Care Circle'
          src={CareCircleIcon}
          className={classes.iconSize}
        />
      ),
    },
    {
      label: 'Devices',
      roles: [Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM],
      icon: (
        <img
          alt='Devices'
          src={DeviceInstallationIcon}
          className={classes.iconSize}
        />
      ),
    },
  ];

  const [value, setValue] = useState(0);

  useEffect(() => {
    const tab = params.get('tab');
    switch (tab) {
      case OnboardingTab.PROFILE_INFO:
        setValue(0);
        navigate(location.pathname, {replace: true});
        return;
      case OnboardingTab.PROVIDER_INFO:
        setValue(1);
        navigate(location.pathname, {replace: true});
        return;
      case OnboardingTab.MEDICAL_INFO:
        setValue(2);
        navigate(location.pathname, {replace: true});
        return;
      case OnboardingTab.CARE_CIRCLE:
        setValue(3);
        navigate(location.pathname, {replace: true});
        return;
      case OnboardingTab.DEVICES:
        setValue(4);
        navigate(location.pathname, {replace: true});
        return;
    }
  }, [params]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [value]);

  const handleChange = (event: any, newValue: any) => {
    SharedStorage.navigationEnable && setValue(newValue);
  };

  return (
      <Box className={classes.container} data-testid='addUser'>
        <Box className={classes.whiteBox} data-testid='addUserInnerBox'></Box>
        <NavTabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          centered
          aria-label='full width tabs example'>
          {navTabs.map((data: any, key: any) => {
            if (data.roles.some((role: any) => userRole.includes(role))) {
              return (
                <NavTab
                  key={data.label}
                  value={key}
                  id={`tab-${key}`}
                  label={
                    <Box
                      display='flex'
                      flexDirection='column'
                      alignItems='center'>
                      <Typography variant='subtitle1'>{data.label}</Typography>
                      <Box className={classes.iconContainer}>{data.icon}</Box>
                    </Box>
                  }
                />
              );
            }
          })}
        </NavTabs>
        <RoleBaseRender forRole={[Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM]}>
          <TabPanel value={value} index={0}>
            <ProfileInfo isOnboardingInfo={isOnboardingInfo} />
            <RoleBaseRender forRole={[Roles.CareAgent]}>
              <BottomNavigation
                navigate={setValue}
                nextValue={1}
                prevValue={1}
                nextLabel='Provider Info'
              />
            </RoleBaseRender>
          </TabPanel>
        </RoleBaseRender>
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <TabPanel value={value} index={1}>
            <ProviderInfo />
            <BottomNavigation
              navigate={setValue}
              nextValue={2}
              prevValue={0}
              nextLabel='Medical Info'
              prevLabel='Profile Info'
            />
          </TabPanel>
        </RoleBaseRender>
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <TabPanel value={value} index={2}>
            <MedicalInfo />
            <BottomNavigation
              navigate={setValue}
              nextValue={3}
              prevValue={1}
              nextLabel='Care Circle'
              prevLabel='Provider Info'
            />
          </TabPanel>
        </RoleBaseRender>
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <TabPanel value={value} index={3}>
            <CareGivers />
            <BottomNavigation
              navigate={setValue}
              nextValue={4}
              prevValue={2}
              nextLabel='Devices'
              prevLabel={`Senior's Medical Condition`}
            />
          </TabPanel>
        </RoleBaseRender>
        <RoleBaseRender forRole={[Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM]}>
          <TabPanel value={value} index={4}>
            <Devices />
            <RoleBaseRender forRole={[Roles.CareAgent]}>
              <BottomNavigation
                navigate={setValue}
                prevValue={3}
                prevLabel='Care Circle'
              />
            </RoleBaseRender>
          </TabPanel>
        </RoleBaseRender>
      </Box>
  );
};

export default AddUserComponent;
