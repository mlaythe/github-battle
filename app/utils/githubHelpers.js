var axios = require('axios');

//incase of rate limiting by Github api
/*
var id = 'YOUR_CLIENT_ID';
var sec = 'YOUR_SECRET_ID';
var param = '?client_id =' + id + '&client_secret=' + sec; */

var getUserInfo = username => {
  return axios.get('http://api.github.com/users/' + username);
};

var helpers = {
  getPlayersInfo: players => {
    return axios.all(players.map(username => {
      return getUserInfo(username);
    })).then(info => {
      return info.map(user => {
        return user.data;
      });
    }).catch(err => {
      console.warn('error found in getPlayersInfo', err);
    });
  }
};

module.exports = helpers;
