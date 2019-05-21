// au-8-1-security-goals-auto-1558459587082

export const getUniqueName = (name: string) => {
  const arr = name.split("-");
  arr.pop();
  const splitName: string = arr.join("-");
  return splitName.replace("-security-goals-auto", "");
};

interface IPod {
  metadata: { name: string };
}

export const uniqueArray = (arr: IPod[]): IPod[] => {
  const cleaned: { [key: string]: string } = {};

  const items = arr.filter((item: IPod) => {
    const name: string = getUniqueName(item.metadata.name);
    if (!cleaned[name]) {
      cleaned[name] = name;
      return true;
    }
  });

  return items;
};
