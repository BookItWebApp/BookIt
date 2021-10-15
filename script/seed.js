'use strict';

const Faker = require('faker');
const fakerHelper = require('./fakerHelper');

const {
  db,
  models: {
    User,
    Article,
    Tagging,
    UserArticle,
    Tag,
    Author,
    Sharing,
    SharingDetail,
  },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const knownUsersInit = [
  { username: 'cody', password: '123', email: 'cody@email.com' },
  { username: 'murphy', password: '123', email: 'murphy@email.com' },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Known Users
  const knownUsers = await Promise.all(
    knownUsersInit.map((user) => {
      return User.create(user);
    })
  );

  // Creating Random Users
  const randomUsers = await fakerHelper(98, User, () => ({
    username: Faker.internet.userName(),
    password: Faker.internet.password(),
    email: Faker.internet.email(),
  }));

  const users = [...knownUsers, ...randomUsers];

  // Creating Authors
  const authors = await fakerHelper(100, Author, () => ({
    name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
    bio: Faker.lorem.paragraph(),
    photoUrl: `http://picsum.photos/200/300?random=${Math.floor(
      Math.random() * 100
    )}}`,
  }));

  // Creating Articles
  const articles = await fakerHelper(100, Article, () => ({
    url: Faker.internet.url(),
    authorId: authors[Math.floor(Math.random() * authors.length)].id,
  }));

  //Creating UserArticles
  const userArticles = await fakerHelper(100, UserArticle, () => ({
    name: Faker.internet.domainName(),
    userId: users[Math.floor(Math.random() * users.length)].id,
    articleId: articles[Math.floor(Math.random() * articles.length)].id,
  }));

  //Create Tags
  const tags = await fakerHelper(100, Tag, () => ({
    name: Faker.random.word(),
  }));

  const taggings = await fakerHelper(100, Tagging, () => ({
    userArticlesId:
      userArticles[Math.floor(Math.random() * userArticles.length)].id,
    tagId: tags[Math.floor(Math.random() * tags.length)].id,
  }));

  // Creating Sharings
  const sharings = [
    { userId: usersSeedResult[0].id, sharingUrl: 'url1', userMessage: 'text1' },
    { userId: usersSeedResult[1].id, sharingUrl: 'url2', userMessage: 'text2' },
  ];

  const sharingSeedResult = await Promise.all(
    sharings.map((sharing) => {
      return Sharing.create(sharing);
    })
  );

  // Creating SharingDetails
  const sharingDetails = [
    {
      sharingId: sharingSeedResult[0].id,
      userArticlesId: userArticleSeedResult[0].id,
    },
    {
      sharingId: sharingSeedResult[0].id,
      userArticlesId: userArticleSeedResult[1].id,
    },
  ];

  await Promise.all(
    sharingDetails.map((sharingDetail) => {
      return SharingDetail.create(sharingDetail);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${authors.length} authors`);
  console.log(`seeded ${articles.length} articles`);
  console.log(`seeded ${userArticles.length} userArticles`);
  console.log(`seeded ${tags.length} tags`);
  console.log(`seeded ${sharings.length} sharings`);
  console.log(`seeded ${sharingDetails.length} sharing details`);
  console.log(`seeded ${taggings.length} taggings`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
