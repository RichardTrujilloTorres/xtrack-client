
export const getValueFromStringOrJSON = (value, key) => {
    try {
        const category = JSON.parse(value);
        return category[key];
    } catch (e) {
        return value;
    }
}

