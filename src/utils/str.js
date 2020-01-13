
export const getValueFromStringOrJSON = (value, key) => {
  try {
    const category = JSON.parse(value);
    return category[key];
  } catch (e) {
    return value;
  }
};

export const capitalize = (value) => {
  if (typeof value === "undefined") {
    return '';
  }

  const firstLetter = value[0] || value.chartAt(0);

  return firstLetter
    ? `${firstLetter.toUpperCase()}${value.slice(1)}`
    : '';
};

