/* eslint-disable @typescript-eslint/no-explicit-any */

export const sortByKey = (array: any[], key: string, order: 'asc' | 'desc' = 'asc') => {
    const orderFactor = order === 'asc' ? 1 : -1;

    return array.slice().sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) return -1 * orderFactor;
        else if (aValue > bValue) return 1 * orderFactor;
        else return 0;
    });
};

export const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];
