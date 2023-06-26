export const generateQueriesPath = <T>(queries: T) => {
  const queryString = Object.entries(queries as { [key: string]: unknown })
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `&${key}=${value}`)
    .join("");

  return queryString;
};
