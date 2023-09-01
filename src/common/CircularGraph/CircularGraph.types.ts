export interface ICircleData {
  value: number;
  color: string;
  key: string;
  bgColor?: string;
}

export interface ICircleProps {
  value?: number;
  color?: string;
  bgColor?: string;
  size?: number;
  thickness?: number;
  top?: number;
  left?: number;
}
export interface ICircularGraphProps {
  data: ICircleData[];
  thickness?: number;
  gap?: number;
  centerSize?: number;
  bgColor?: string;
}
