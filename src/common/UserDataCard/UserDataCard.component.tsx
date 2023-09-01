import {Box, Button} from '@mui/material';
import clsx from 'clsx';
import AvatarComponent from 'common/Avatar/Avatar.component';
import SeniorBasicDetails from './SeniorBasicDetails.component';
import {UserDataCardStyle} from './UserDataCard.style';
import {
  constructLocation,
  constructName,
  constructNameInitials,
  constructTimezoneAbbr,
  getAge,
} from 'globals/global.functions';
import {IUserDataCardProps} from './UserDataCard.types';
import ResidentBasicDetails from './ResidentBasicDetails.component ';

const UserDataCard = ({userData, onAssign}: IUserDataCardProps) => {
  const {classes} = UserDataCardStyle();
  return (
    <>
      <Box
        className={classes.userCard}
        data-testid='user-data-card'
        onClick={onAssign}>
        <Box display='flex'>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Box style={{width: '72px', height: '72px'}}>
              <AvatarComponent
                altText='profile-image'
                imageUrl={userData.profileImage}
                child={constructNameInitials(
                  userData.name?.firstName,
                  userData.name?.lastName,
                )}
                className={clsx({
                  [classes.image]: true,
                  [classes.imageBorder]: !userData.profileImage,
                })}
              />
            </Box>
            <Button className={classes.assignButton} data-testid = 'assignBtn'>Assign</Button>
          </Box>
          {userData?.isResident ? (
            <ResidentBasicDetails
              ResidentName={constructName(
                userData.name?.firstName,
                userData.name?.lastName,
              )}
              location={constructLocation(userData.location)}
              timezone={constructTimezoneAbbr(userData.timezone)}
              facility={userData.facility}
            />
          ) : (
            <SeniorBasicDetails
              seniorName={constructName(
                userData.name?.firstName,
                userData.name?.lastName,
              )}
              location={constructLocation(userData.location)}
              timezone={constructTimezoneAbbr(userData.timezone)}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserDataCard;
