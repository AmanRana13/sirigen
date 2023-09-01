import {useAppSelector} from 'hooks/reduxHooks';
import {IUserNameProps} from './UserName.types';

const RenderName = ({name}: any) => {
  return (
    <>
      {name?.firstName && (
        <>
          {name.firstName}
          &nbsp;
        </>
      )}
      {name?.middleName && (
        <>
          {name.middleName}
          &nbsp;
        </>
      )}
      {name?.lastName && (
        <>
          {name.lastName}
          &nbsp;
        </>
      )}
    </>
  );
};

const UserName = ({firstName, middleName, lastName, name}: IUserNameProps) => {
  const userName = useAppSelector((state: any) => state.auth.userName);

  return (
    <>
      {name && <RenderName name={name} />}
      {firstName && (
        <>
          {userName.first_name}
          &nbsp;
        </>
      )}
      {middleName && (
        <>
          {userName.middle_name}
          &nbsp;
        </>
      )}
      {lastName && (
        <>
          {userName.last_name}
          &nbsp;
        </>
      )}
    </>
  );
};

export default UserName;
