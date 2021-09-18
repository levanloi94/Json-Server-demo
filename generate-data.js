const faker = require('faker');
const fs = require('fs');

//Set locale to use Vietnamese

faker.locale = 'vi';

//Random data
// console.log("depart", faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.random.uuid());
// console.log(faker.image.imageUrl());

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  
  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberProducts) => {
  if (numberProducts <= 0) return [];

  productsList = [];

  for (const category of categoryList) {
    Array.from(new Array(numberProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: parseInt(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdDate: Date.now(),
        updatedDate: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };

      productsList.push(product);
    });
  }

  //random data

  return productsList;
};

//IFFE
(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productsList = randomProductList(categoryList, 5);

  //prepare db object
  const db = {
    categories: categoryList,
    products: productsList,
    profile: {
      name: 'Heo',
    },
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data success');
  });
})();
