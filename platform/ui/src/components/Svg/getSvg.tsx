import React from 'react';
// Svgs
import mcmLogo from './../../assets/svgs/mcm-logo.svg';

const SVGS = {
  'logo-mcm': mcmLogo,
};

/**
 * Return the matching SVG as a React Component.
 * Results in an inlined SVG Element. If there's no match,
 * return `null`
 */
export default function getSvg(key, props) {
  console.log(key, SVGS[key]);

  if (!key || !SVGS[key]) {
    return React.createElement('div', null, 'Missing SVG');
  }

  return React.createElement(SVGS[key], props);
}

export { SVGS };
