import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Skeleton,
} from '@mui/material';
import {capitalizeAndJoinStrings} from 'globals/global.functions';
import {useNavigate} from 'react-router-dom';
import {facilityBreadcrumbs} from './facilityBreadcrumbs.style';
import clsx from 'clsx';
import useFacitlityBreadcrumb from 'hooks/useFacilityBreadcrumbs';
import {facilitySlugs} from 'globals/global.constants';
import {IBreadcrumbItemsProps} from './FacilityBreadcrumbs.types';
import React from 'react';

/**
 * @description method to modify the breadcrum title
 * @param {string[]}arrayTitles
 * @returns {string}
 */
const breadCrumbTitle = (arrayTitles: string[]): string => {
  const [key, title] = arrayTitles;

  if (key === facilitySlugs.residentDashboard) {
    return title + ' Dashboard';
  }
  return title;
};

/**
 * @description Breadcrumb items
 * @param {IBreadcrumbItemsProps} props
 * @returns {React.ReactElemen}
 */
const BreadcrumbItems = ({
  data,
  pathnames,
  index,
  navigate,
  isLoading,
}: IBreadcrumbItemsProps): React.ReactElement => {
  const [key, value] = data;

  //routeTo is the path, where user should navigate on clicking on breadcrumb
  const routeTo = `/${pathnames
    .slice(0, index + 1)
    .map((value: any) => value)
    .join('/')}`;

  //isLast checking if the breadcrumb item is the selected one.
  const isLast = index === pathnames.length - 1;

  let name = value.value;
  name = breadCrumbTitle([key, name]);

  if (isLoading) {
    return <Skeleton animation='wave' width={200} />;
  }

  if (isLast) {
    return (
      <Typography variant='h6' color='#0186a5' key={name}>
        {capitalizeAndJoinStrings(name.split(' '), ' ')}
      </Typography>
    );
  }

  return (
    <Link
      key={name}
      style={{color: 'black', textDecoration: 'none', cursor: 'pointer'}}
      className={clsx({disableLink: true})}
      onClick={() => navigate(routeTo)}>
      {capitalizeAndJoinStrings(name.split(' '), ' ')}
    </Link>
  );
};

const FacilityBreadcrumbs = () => {
  const navigate = useNavigate();
  const {classes} = facilityBreadcrumbs();

  const {options, isLoading} = useFacitlityBreadcrumb();
  const pathnames = options.map(
    ([paramKey, paramObject]: any) => paramObject.path,
  );

  return (
    <MuiBreadcrumbs
      className={classes.breadcrumb}
      aria-label='breadcrumb'
      data-testid='breadcrumb'
      separator='>'>
      {options.map((data: any, index: number) => (
        <BreadcrumbItems
          key={`breadcrumbitem-${index}`}
          data={data}
          pathnames={pathnames}
          index={index}
          navigate={navigate}
          isLoading={isLoading}
        />
      ))}
    </MuiBreadcrumbs>
  );
};

export default FacilityBreadcrumbs;
