/* eslint-disable max-len */
import {Avatar} from '@mui/material';
import { AvatarVariants } from 'globals/enums';
import React from 'react';


interface IAvatarProps {
  altText: string;
  imageUrl?: string;
  child?: React.ReactNode;
  className?: any;
  style?: any;
  component?: any;
  variant?: AvatarVariants;
}

/**
 * @description common component which create an avatar
 * @param {string} altText alternate text will display when image is not able to load because of any issue
 * @param {string} imageUrl url of image
 * @param {React.ReactNode} child any component which we want to show as a child
 * @param {any} className styling
 * @param {any} style styling props
 * @param {any} component type of component
 * @param {AvatarVariants} variant varient of avatar
 * @returns an avatar
 */
const AvatarComponent = ({
  altText,
  imageUrl,
  child,
  className,
  style,
  component,
  variant,
}: IAvatarProps) => {
  return (
    <>
      <Avatar
        alt={altText}
        src={imageUrl}
        className={className}
        style={style}
        component={component}
        variant={variant}>
        {child}
      </Avatar>
    </>
  );
};

export default AvatarComponent;
