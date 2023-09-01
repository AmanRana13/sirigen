export interface IBreadcrumbItemsProps {
  data: any;
  pathnames: string[];
  index: number;
  navigate: (routeTo: string) => void;
  isLoading: boolean;
}
