const fakerHelper = async (n, model, fakerCallback) => {
  /*
  fakerCallback example: = () => ({
    firstname: Faker.name.firstName()
    lastName: Faker.name.lastName()
  })
  */
  if (n === 1) {
    try {
      return [await model.create(fakerCallback())];
    } catch (error) {
      return [];
    }
  } else {
    try {
      const newInstance = await model.create(fakerCallback());
      return [newInstance, ...(await fakerHelper(n - 1, model, fakerCallback))];
    } catch (error) {
      return [...(await fakerHelper(n - 1, model, fakerCallback))];
    }
  }
};

module.exports = fakerHelper;
