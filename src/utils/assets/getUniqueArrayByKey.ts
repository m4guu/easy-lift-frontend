export const getUniqueArrayByKey = (data: any[] | undefined, key: string) => {
  if (!data) {
    return [];
  }
  return [
    ...new Map(data?.map((dataItem) => [dataItem[key], dataItem])).values(),
  ];
};
