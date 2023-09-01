import { Float, ThemeVersion } from "globals/enums";
import { ReactNode } from "react";

export interface IRemainingCharactersProps {
  value: string;
  limit: number;
  children?: ReactNode;
  themeVersion?: ThemeVersion;
  float?: Float;
}