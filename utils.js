/* eslint implicit-arrow-linebreak:0 */
const slugify = require('slugify');

const slug = (text) =>
  slugify(text, { lower: true, remove: /[*+~.()'"!:@]/g });

const phraseUrl = (phrase) =>
  `${process.env.SITE_BASE_URL}/${phrase.id}/${slug(phrase.author)}/`;

const markdownMsg = (phrase) =>
  `\n*"${phrase.quote}"*\n⏤ _${phrase.author}_\n[${phraseUrl(phrase)}](${phraseUrl(phrase)})`;

const randonPhrase = (phrases) => {
  const id = Math.floor(Math.random() * phrases.length);
  const phrase = phrases[id];

  return { id, ...phrase };
};

module.exports = {
  markdownMsg,
  randonPhrase,
};
