const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value == "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value == "object" && Object.keys(value).length === undefined)
  );
};

module.exports = isEmpty;
