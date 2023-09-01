import {facilitySlugs, residentSubPages} from 'globals/global.constants';
import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from 'utilities/react-query';
import {useAppDispatch, useAppSelector} from './reduxHooks';
import {
  getSeniorFullName,
  setSeniorDetail,
} from 'store/commonReducer/common.action';

interface IUseFacitlityBreadcrumbReturn {
  options: string[][];
  isLoading: boolean;
}

/**
 * @description hook to access the breadcrumb options and store API logic.
 * @returns {IUseFacitlityBreadcrumbReturn}
 */
const useFacitlityBreadcrumb = (): IUseFacitlityBreadcrumbReturn => {
  const params = useParams();
  const dispatch: any = useAppDispatch();
  const minimalInfo = useAppSelector(
    (state) => state.common.seniorDetail.minimalInfo,
  );
  const fullname = React.useMemo(
    () => dispatch(getSeniorFullName()),
    [minimalInfo],
  );
  const breadcrumbMap: any = {
    [facilitySlugs.facilityManagement]: {
      value: 'Facility Management',
      path: facilitySlugs.facilityManagement,
    },
  };

  const fetchFacilityData = useQuery({
    queryKey: ['facilityData'],
    queryFn: async (): Promise<any> => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {name: 'Atria Living'};
    },
    enabled: params[facilitySlugs.facilityDashboard] ? true : false,
    cacheTime: 0,
  });

  if (fetchFacilityData.data && params[facilitySlugs.facilityDashboard]) {
    breadcrumbMap[facilitySlugs.facilityDashboard] = {
      value: fetchFacilityData.data.name,
      path: params[facilitySlugs.facilityDashboard],
    };
  }

  if (params[facilitySlugs.facilityResident]) {
    breadcrumbMap[facilitySlugs.facilityResident] = {
      value: params[facilitySlugs.facilityResident],
      path: params[facilitySlugs.facilityResident],
    };
  }

  if (
    params[facilitySlugs.residentDashboard] &&
    params[facilitySlugs.accountID]
  ) {
    breadcrumbMap[facilitySlugs.residentDashboard] = {
      value: fullname?.trim() && `${fullname}`,
      path: `${params[facilitySlugs.residentDashboard]}/${
        params[facilitySlugs.accountID]
      }/${params[facilitySlugs.timezone] || ''}`,
    };
  }

  if (params[facilitySlugs.subRoute]) {
    const subRoute =
      Object.values(residentSubPages).find(
        (subPage: any) => subPage.path === params[facilitySlugs.subRoute],
      ) || '';
    if (subRoute) {
      breadcrumbMap[facilitySlugs.subRoute] = {
        value: subRoute.value,
        path: `${params[facilitySlugs.residentDashboard]}/${
          params[facilitySlugs.accountID]
        }/${params[facilitySlugs.timezone] || ''}/${
          params[facilitySlugs.subRoute] || ''
        }`,
      };
    }
  }
  React.useEffect(() => {
    if (
      params[facilitySlugs.residentDashboard] &&
      params[facilitySlugs.accountID]
    ) {
      dispatch(setSeniorDetail());
    }
  }, [params, dispatch]);

  return {
    isLoading: fetchFacilityData.isLoading || !fullname.trim(),
    options: Object.entries(breadcrumbMap),
  };
};

export default useFacitlityBreadcrumb;
