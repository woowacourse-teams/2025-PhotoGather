export const calculatePrevNextId = (idList: number[], currentId: number) => {
  let prevId = null;
  let nextId = null;

  const currentIdIndex = idList.indexOf(currentId);
  if (currentIdIndex === -1) return { prevId, nextId };
  if (currentIdIndex - 1 >= 0) prevId = idList[currentIdIndex - 1];
  if (currentIdIndex + 1 < idList.length) nextId = idList[currentIdIndex + 1];
  return { prevId, nextId };
};
