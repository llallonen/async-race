export const buildClassName = (classNames: Array<string>) => classNames.reduce((acc, className) => `${acc}.${className}`, '');
