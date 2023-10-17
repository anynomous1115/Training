const { getData } = require("./service");

const dataUpdate = async (value, field) => {
  try {
    let data = await getData();
    const { cartsItem } = data;
    data[field].push(value);
    return data;
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  }
};

module.exports = {
  dataUpdate,
};