'use strict';
const Faker = require('faker');
const urlArry = require( "./urlSeedData")


const {
  db,
  models: { User, Article, Tagging, UserArticle, Tag, Author },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

//Parameters
let userCount = 250
let articleCount = 500 //Max: 5000
let authorCount = 100
let readArticlesModulo = 2 //divisor - the large the number the lower the % read
let userArticlesCount = (articleCount * 5)
let tagCount = 700
let MaxTaggingsCount = 3000





async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  //Random Number Generator
  function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  //Create Users
  console.log('Seeding Users...');
  //Test User
  let initialUsers = [];
  initialUsers.push({
    username: 'cody',
    password: '123',
    email: 'codytest@fullstackacademy.com'})
  //seed users
  for (let i = 2; i < userCount; i++) {
    initialUsers.push({
      username: `${Faker.internet.userName()}`,
      password: Faker.internet.password(),
      email: Faker.internet.email(),
    });
  }
  //seed users
  const users = await Promise.all(
    initialUsers.map((user) => {
      return User.create(user);
    })
  );

  // Creating Authors
  let initialAuthors = [];
  for (let i = 0; i < authorCount; i++) {
    initialAuthors.push({
      name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
      bio: Faker.lorem.paragraph(),
      photoUrl: `http://picsum.photos/200/300?random=${i + 1}`,
    });
  }
  console.log('Seeding Authors...');
  //seed authors
  const authors = await Promise.all(
    initialAuthors.map((author) => Author.create(author))
  );

  // Create Articles
  //enfore unique urls
  // let urlsList = [];
  // function generateUniqueURL() {
  //   let startLength = urlsList.length;
  //   while (startLength === urlsList.length) {
  //     let url = Faker.internet.url();
  //     if (urlsList.indexOf(url) > -1) {
  //       continue;
  //     } else {
  //       urlsList.push(url);
  //       return url;
  //     }
  //   }
  // }

  console.log('Seeding Articles...');
  //create articles
  let initialArticles = [];
  for (let i = 0; i < articleCount; i++) {
    initialArticles.push({
      url: urlArry[i],
      authorId: authors[getRandomArbitrary(0,99)].id,
    });
  }
  //seed articles
  const articles = await Promise.all(
    initialArticles.map((article) => Article.create(article))
  );

  // Create userArticles
  //generate readAt data including null value
  let readDates = [];
  for (let i = 0; i < userArticlesCount; i++) {
    let date = Faker.date.between('2015-01-01', '2021-10-05');
    date = date.toString();
    readDates.push(i % readArticlesModulo === 0 ? null : date);
  }

  console.log('Seeding User Articles...');
  let intitalUserArticles = [];
  let articleUserPair = []
  for (let i = 0; i < userArticlesCount; i++) {
    let createDate = readDates[i]
      ? Faker.date.past(5, readDates[i])
      : Faker.date.past(5);
    createDate = createDate.toString();

    let userId =  users[getRandomArbitrary(0, 99)].id
    let articleId = Faker.datatype.number({ min: 1, max: 99 })
    let articleUser = `${articleId}-${userId}`

    if(articleUserPair.indexOf(articleUser)===-1){
      intitalUserArticles.push({
        name: Faker.lorem.words(),
        featured: Faker.datatype.boolean(),
        private: Faker.datatype.boolean(),
        articleId: articleId,
        readAt: readDates[i],
        createdAt: createDate,
        userId: userId
      }),
      articleUserPair.push(
        articleUser
      )
    }
  }

  //seed userArticles
  const userArticles = await Promise.all(
    intitalUserArticles.map((userArticle) => UserArticle.create(userArticle))
  );

  console.log('Seeding Tags...');
  //Create Tags
  //enforce unique urls
  let tagsList = [];
  function generateUniqueTags() {
    let startLength = tagsList.length;
    while (startLength === tagsList.length) {
      let tag = Faker.random.word();
      if (tagsList.indexOf(tag) > -1) {
        continue;
      } else {
        tagsList.push(tag);
        return tag;
      }
    }
  }

  let initialTags = [];
  for (let i = 0; i < tagCount; i++) {
    initialTags.push({
      name: generateUniqueTags(),
    });
  }
  //seed Tags
  const tags = await Promise.all(initialTags.map((tag) => Tag.create(tag)));

  console.log('seed taggings...')
  //make sure every tag used at least once
  let tagCheck = [];
  tags.forEach((tag) => tagCheck.push(tag.name));

  // CREATE TAGGINGS DB DATA
  let initialTaggings = [];
  let articleTagPairs = [];
  //while a single tag hasn't been used and we haven't spent too long looping
  while (tagCheck.length > 1 && initialTaggings.length < MaxTaggingsCount) {
    //create random data for tag and article data
    let tag = tags[getRandomArbitrary(0, tags.length - 1)];
    let articleId = tagCheck.length %100 ===0 ? null:
      userArticles[getRandomArbitrary(0, userArticles.length - 1)].id;
    let tagId = tag.id;
     let articleTag = `${articleId}${tagId}`;
    //if article-pair hasn't been seen before push to to be created list articleTag)
    if (articleTagPairs.indexOf(articleTag) === -1) {
      initialTaggings.push({
        featured: `${Faker.datatype.boolean()}`,
        tagId: tagId,
        userArticlesId: articleId,
      });
      //log article-tag pair for future check
      articleTagPairs.push(
        articleTag,
      );
      //remove added tag from tagCheck
      let index = tagCheck.indexOf(tag.name);
      if (index > -1) {
        tagCheck.splice(index, 1);

        //TAGGINGS visibiliy calls. Uncomment if you want to see the calls for tagging counts
        // console.log('---')
        // console.log('Tags left - ', tagCheck.length)
        // console.log('Taggings created -', initialTaggings.length)
      }
    }
  }

  const taggings = await Promise.all(
      initialTaggings.map((tag) => Tagging.create(tag))
    );

    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${authors.length} authors`);
    console.log(`seeded ${articles.length} articles`);
    console.log(`seeded ${userArticles.length} userArticles`);
    console.log(`seeded ${tags.length} tags`);
    console.log(`seeded ${taggings.length} taggings`);
    console.log(`seeded successfully`);
  }


/*
  We've separated the `seed` function from the `runSeed` function.
  This way we can isolate the error handling and exit trapping.
  The `seed` function is concerned only with modifying the database.
  */
async function runSeed() {
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
