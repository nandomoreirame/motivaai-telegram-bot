require('dotenv').config();

const Botgram = require('botgram');
const fetch = require('node-fetch');
const utils = require('./utils');

const { TELEGRAM_BOT_TOKEN, API_BASE_URL, SITE_BASE_URL } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Parece que você esqueceu de passar o TELEGRAM_BOT_TOKEN. Não posso continuar...');
  process.exit(1);
}

const motivaBot = new Botgram(TELEGRAM_BOT_TOKEN);
const helpMessage = 'Para exibir a *frase do dia* digite o comando: /motiva ou /motivaai';

const motivaAi = (msg, reply) => fetch(`${API_BASE_URL}/v1`)
  .then((res) => res.json())
  .then(({ data }) => utils.randonPhrase(data))
  .then((phrase) => {
    console.log(utils.markdownMsg(phrase));
    reply.markdown(utils.markdownMsg(phrase));
  })
  .catch(() => reply.markdown('Um erro ocorreu. Contate o suporte: [twitter.com/oseunando](https://twitter.com/oseunando)').then());

motivaBot.command('start', 'help', (msg, reply) => reply.markdown(helpMessage));

motivaBot.command('motiva', 'motivaai', (msg, reply) => motivaAi(msg, reply));

motivaBot.command((msg, reply) => reply.markdown(`Oops! Comando inválido. ${helpMessage}`));

module.exports = (req, res) => {
  res.status(200).send(`${SITE_BASE_URL}`);
};
