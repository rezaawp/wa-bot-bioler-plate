module.exports = (data) => {
  const result = data.map((x) => x.get({ plain: true }));
  return {
    get: () => {
      return result;
    },
    first: () => {
      return result[0];
    },
  };
};
