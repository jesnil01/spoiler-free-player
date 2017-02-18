/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const Prismic = require('prismic.io');

// If you need a backend, e.g. an API, add your custom backend-specific middleware here

const apiUrl = "https://player.prismic.io/api";

function getTournaments(req, res) {
  Prismic.api(apiUrl).then(function(api) {
    return api.query([
      Prismic.Predicates.at('document.type', 'tournament'),
    ]);
  }).then( function(result) {

    const returnResult = result.results.map(item => {
      return {
        title: item.data['tournament.title'].value,
        slug: item.uid,
      };
    });

    res.send(returnResult);
  }).catch( function(err){
    console.log(err);
    console.log('Catched error');
    res.send('Error');
  });
}

app.use('/api/tournaments/', getTournaments);

function getSingleTournamentBlock(id) {
  return Prismic.api(apiUrl).then(function(api) {
    return api.getByID(
      id,
      {fetchLinks: ['match.title']}
    );
  }).then( function(result) {
    const title = result.data['tournament-block.title'].value;
    const matchList = result.data['tournament-block.match-list'].value;

    const returnMatchList = matchList.map((item) => {
      return {
        title: item.match.value.document.data.match.title.value,
        id: item.match.value.document.id,
        slug: item.match.value.document.slug,
      };
    });

    const debug = result.data;
    return {
      title: title,
      // debug: debug,
      matchList: returnMatchList,
    };
  }).catch( function(err){
    console.log(err);
    console.log('Catched error cross');
    // res.send('Error cross Query');
  });
}

function getSingleTournament(req, res) {
  const requestStart = Date.now();

  Prismic.api(apiUrl).then(function(api) {
    var uid = req.params.uid;
    return api.getByUID('tournament', uid);
  }).then( function(result) {

    const objectToSend = {
      title: result.data['tournament.title'].value,
      blocks: [],
    };

    const blocks = result.data['tournament.blocks'].value;

    //Check if blocks is empty
    if (!blocks) {

      res.send(objectToSend);

    } else {

      const blockPromises = blocks.map((item) => {
        return getSingleTournamentBlock(item.block.value.document.id);
      });

      Promise.all(blockPromises).then(values => {
        objectToSend.blocks = values;
        objectToSend.requestTime = `${Date.now() - requestStart} ms`;
        console.log('Success all promises');

        res.send(objectToSend);

      }, reason => {
        console.log(reason)
      });
    }
  }).catch( function(err){
    console.log(err);
    res.send('Error');
  });
}

app.use('/api/tournament/:uid', getSingleTournament);


// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
