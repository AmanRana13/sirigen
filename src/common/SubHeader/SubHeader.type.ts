export interface ISubHeaderLists {
  key?: string;
  name: string;
  defaultPath?: string;
  disabled: boolean;
  label: string;
  listItem: number;
  currentRoute: string;
  changeRoute: (path: string, defaultPath?: string) => void;
  marginRight: boolean;
  showNotification?: boolean;
  showIncomplete?: boolean;
}

export interface ILists {
  name: string;
  label: string;
  roles: Array<string>;
  showNotification?: boolean;
  defaultPath?: string;
  disabled?: boolean;
  showIncomplete?: boolean;
}
