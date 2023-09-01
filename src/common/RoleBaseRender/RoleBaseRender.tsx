import {useAppSelector} from 'hooks/reduxHooks';

interface IRoleBaseRenderProps {
  forRole: string[] | string | any;
  children: JSX.Element;
  hasAll?: boolean;
  notForRole?: string;
}

const RoleBaseRender = ({
  forRole,
  children,
  hasAll,
  notForRole,
}: IRoleBaseRenderProps) => {
  const userRole = useAppSelector((state: any) => state.auth.userRole);
  
  if (notForRole) {
    if (userRole.includes(notForRole)) {// if user role found than return null else component
      return null;
    }
    return children;
  }

  if (userRole.includes(forRole)) {
    return children;
  } else if (Array.isArray(forRole)) {
    const hasRole = hasAll
      ? forRole.every((role: string) => userRole.includes(role))
      : forRole.some((role: string) => userRole.includes(role));

    return hasRole ? children : null;
  }

  return null;
};

RoleBaseRender.defaultProps = {
  forRole: '',
  children: null,
  hasAll: false,
};

export default RoleBaseRender;
