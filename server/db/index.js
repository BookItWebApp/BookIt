//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Article = require('./models/Article');
const Tagging = require('./models/Tagging');
const Tag = require('./models/Tag');
const UserArticle = require('./models/UserArticle');
const Author = require('./models/Author');
const Sharing = require('./models/Sharing')
const SharingDetail = require('./models/SharingDetail')

//associations could go here!
User.hasMany(UserArticle, { foreignKey: 'userId' });
UserArticle.belongsTo(User, { foreignKey: 'userId' });

Article.hasMany(UserArticle, { foreignKey: 'articleId' });
UserArticle.belongsTo(Article, { foreignKey: 'articleId' });

UserArticle.hasMany(Tagging, { foreignKey: 'userArticlesId' });
Tagging.belongsTo(UserArticle, { foreignKey: 'userArticlesId' });

Tag.hasMany(Tagging, { foreignKey: 'tagId' });
Tagging.belongsTo(Tag, { foreignKey: 'tagId' });

Author.hasMany(Article);
Article.belongsTo(Author);

User.hasMany(Sharing, { foreignKey: 'userId' });
Sharing.belongsTo(User,{ foreignKey: 'userId' });

Sharing.hasMany(SharingDetail, { foreignKey: 'sharingId' });
SharingDetail.belongsTo(Sharing, { foreignKey: 'sharingId' })

UserArticle.hasMany(SharingDetail, { foreignKey: 'userArticlesId' });
SharingDetail.belongsTo(UserArticle, { foreignKey: 'userArticlesId' });


module.exports = {
  db,
  models: {
    User,
    Article,
    Tag,
    Tagging,
    UserArticle,
    Author,
    Sharing,
    SharingDetail
  },
};
