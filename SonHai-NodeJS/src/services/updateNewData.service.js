const { getData } = require("./service");

const dataUpdate = async (value, field) => {
  let data = await getData();
  data[field].push(value);
  return data;
};

module.exports = {
  dataUpdate,
};
