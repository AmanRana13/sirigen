import React from 'react';
import {IShowHyphenProp} from './ShowHyphen.types';

/**
 * @function ShowHyphen
 * @description component to show hyphen
 * @returns JSX
 */
const ShowHyphen: React.FC<IShowHyphenProp> = ({children, value, withValue}) => {
  if (withValue) {
    if (!value) {
      return '-'
    }
  }
  if (children) {
    return children;
  }
  return '-';
};

export default ShowHyphen;
