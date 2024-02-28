
/**
 * 
 * @param {Object} obj 
 * @returns {Object | null}
 */
const cleanObject = (obj) => { // purifyObject, Hydrator??
    for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null) {
            return null;
        }
    }
    return obj;
}

module.exports = {
    cleanObject,
}