export const isEmpty = (data: unknown) => data === null || data === undefined;

export const isObject = (data: unknown) => data && typeof data === 'object';
