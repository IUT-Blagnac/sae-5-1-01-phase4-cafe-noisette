
export const reorder = <T>(
    list: T[],
    startIndex: number,
    endIndex: number
): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderListByIds = <T>(list: T[], idList: number[], idKey: keyof T): T[] => {
    const idMap = new Map<number, T>();
    list.forEach(item => idMap.set(item[idKey] as number, item));
    const reorderedList = idList.map(id => idMap.get(id));
    return reorderedList.filter(item => item !== undefined) as T[];
}