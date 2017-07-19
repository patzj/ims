export const extractDate = (date) => {
    return date.split('-').map(item => {
        return parseInt(item);
    });
};
