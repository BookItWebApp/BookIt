async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const usersSeedResult = await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );
  // Creating Authors
  let initialAuthors = [];
  for (let i = 0; i < 100; i++) {
    initialAuthors.push({
      name: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
      bio: Faker.lorem.paragraph(),
      photoUrl: `http://picsum.photos/200/300?random=${i + 1}`,
    });
  }

  const authors = await Promise.all(
    initialAuthors.map((author) => Author.create(author))
  );

  // Creating Articles
  const articles = await Promise.all([
    Article.create({
      url: 'https://www.reuters.com/world/americas/exclusive-major-coffee-buyers-face-losses-colombia-farmers-fail-deliver-2021-10-11/',
      authorId: authors[0].id,
    }),
    Article.create({
      url: 'https://www.vox.com/22709339/james-bond-no-time-die-review-daniel-craig',
      authorId: authors[1].id,
    }),
  ]);

  //Creating UserArticles

  const userArticles = [
    {
      featured: false,
      name: 'Google',
      userId: usersSeedResult[0].id,
      articleId: 1,
      readAt: null,
    },
    {
      featured: false,
      name: 'Wikipedia',
      userId: usersSeedResult[1].id,
      articleId: 1,
      readAt: null,
    },
  ];

  const userArticleSeedResult = await Promise.all(
    userArticles.map((userArticle) => {
      return UserArticle.create(userArticle);
    })
  );

  //Create Tags
  const tags = await Promise.all([
    Tag.create({ name: 'news' }),
    Tag.create({ name: 'notNews' }),
  ]);

  // Creating Taggings
  const taggings = [
    { featured: true, userArticlesId: userArticleSeedResult[0].id, tagId: 1 },
    { featured: false, userArticlesId: userArticleSeedResult[0].id, tagId: 2 },
  ];

  await Promise.all(
    taggings.map((tagging) => {
      return Tagging.create(tagging);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${authors.length} authors`);
  console.log(`seeded ${articles.length} articles`);
  console.log(`seeded ${userArticles.length} userArticles`);
  console.log(`seeded ${tags.length} tags`);
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
