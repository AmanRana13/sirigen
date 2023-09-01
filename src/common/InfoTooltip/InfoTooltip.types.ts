import { TooltipProps } from "@mui/material";

export interface IInfoTooltipProps extends Omit<TooltipProps, 'title' | 'children'> {
    children?: any;
}
