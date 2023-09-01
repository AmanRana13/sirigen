export interface IListDetail {
  label: string;
  route?: string;
  value?: string;
  render?: () => JSX.Element;
}
