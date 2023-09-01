import {FC} from 'react';

export interface INavTabsInfo {
  label: string;
  component: FC;
}
export interface IHeaderTabs {
  navTabs: INavTabsInfo[];
}
