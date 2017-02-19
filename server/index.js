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


function getTeamnames(matchId){
  console.log('Match id');
  console.log(matchId);
  return Prismic.api(apiUrl).then(function(api) {
    return api.getByID(
      matchId,
      {fetchLinks: ['team.name']}
    );
  }).then( function(result){
    const team1 = result.data['match.team-1'].value.document.data.team.name.value;
    const team2 = result.data['match.team-2'].value.document.data.team.name.value;

    return {
      team1,
      team2,
    };
    // console.log(result.data['match.team-1']);
    // res.send('Error cross Query');
  }).catch( function(err){
    console.log(err);
    console.log('Catched error team request');
    // res.send('Error cross Query');
  });
}

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
      let safeToSpoil = false;

      if (item['does-not-spoil']) {
        safeToSpoil = item['does-not-spoil'].value === 'True' ? true : false;
      }

      return {
        title: item.match.value.document.data.match.title.value,
        id: item.match.value.document.id,
        slug: item.match.value.document.slug,
        safeToSpoil,
      };
    });

      // getTeamnames('WKjH5iUAAE9KwFU0');
      // const team1 = getTeamnames(item.block.value.document.id);
      // const teamNames = getTeamnames('WKjH5iUAAE9KwFU0');
      const teamNamePromises = matchList.map((item) => {
        const matchId = item.match.value.document.id;
        return getTeamnames(matchId);
      });



      // Promise.all(teamNamePromises).then(values => {
      //   console.log('Success all team promises bre');

      //   // res.send(objectToSend);
      //   // console.log(values);
      //   console.log(returnMatchList);

      //   // values.forEach((result, i) => {
      //   //   returnMatchList[i].teams = item;
      //   // });



      // }, reason => {
      //   console.log(reason)
      // });


      return {
        title: title,
        matchList: returnMatchList,
        teamNamePromises,
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
        

        // console.log('Success all promises');
        // console.log(values)
        let allProm = [];
        values.forEach((val) => {
          prom = [].concat(...val.teamNamePromises);
          allProm.push(prom);
        });

        // console.log(allProm);

        // if(allProm.length > 1){
        //   allProm = [].concat(...allProm);
        // }
        
        // objectToSend.allProm = allProm;

        // console.log('allProm', allProm);

        var promise4all = Promise.all(
           allProm.map(function(innerPromiseArray) {
                return Promise.all(innerPromiseArray);
           })
        );

        // console.log(promise4all);

        promise4all.then(function(promiseGroupResult) {

          //Insert teams
          promiseGroupResult.map((teamNamesBlock, blockIndex) => {
            teamNamesBlock.map((teamNames, matchIndex) => {
              objectToSend.blocks[blockIndex].matchList[matchIndex].teams = teamNames;
              // console.log(teamNames);
            });
          });


          objectToSend.requestTime = `${Date.now() - requestStart} ms`;
          res.send(objectToSend);
          // promiseGroupResult is the actual result of each promise group
          // and you'll be able to get each result this way: promiseGroupResult.somePropertyName
        });

        //Check for Team name Promises
        // Promise.all(allProm).then(vals => {
        //   console.log('NOW FUCKING ALL INNER IS DONE');
        //   console.log(vals);
        // }, reas => {
        //   console.log(reas);
        // });

        

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



function getMatch(req, res) {
  Prismic.api(apiUrl).then(function(api) {
    const { id } = req.params;
    return api.getByID(
      id,
      {fetchLinks: ['team.name']}
    );
  }).then( function(result) {

    const games = result.data['match.games'].value.map(item => {
      console.log(item);
      let id = false;
      let gameStart = 0;
      let winner = 0;

      if (item['video-id']) {
        id = item['video-id'].value;
        gameStart = item['game-start'].value;
        winner = item.winner.value === 'Team 1' ? 1 : 2;
      }

      return {
        id,
        gameStart,
        winner,
      };
    });

    const returnObj = {
      title: result.data['match.title'].value,
      games,
      teams: [
        {
          id: result.data['match.team-1'].value.document.id,
          uid: result.data['match.team-1'].value.document.uid,
          name: result.data['match.team-1'].value.document.data.team.name.value,
        },
        {
          id: result.data['match.team-2'].value.document.id,
          uid: result.data['match.team-2'].value.document.uid,
          name: result.data['match.team-2'].value.document.data.team.name.value,
        },
      ]
    };

    res.send(returnObj);
  }).catch( function(err){
    console.log(err);
    console.log('Catched error match');
    res.send('Error');
  });
}

app.use('/api/match/:id', getMatch);

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
