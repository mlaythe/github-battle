var axios = require('axios');

var getUserInfo = username => {
  return axios.get('https://api.github.com/users/' + username);
};

var getPlayersData = player => {
  return {
    followers: player.followers,
    repos: player.public_repos
  };
};

var calculateScores = players => {
  return [
    players[0].followers * 3 + players[0].repos,
    players[1].followers * 3 + players[1].repos
  ];
};

var helpers = {
  getPlayersInfo: players => {
    return axios.all(players.map(function (username) {
      return getUserInfo(username);
    }))
    .then(info => {
      return info.map(function (user) {
        return user.data;
      });
    })
    .catch(function (err) {console.warn('Error in getPlayersInfo: ', err);});
  },
  battle: players => {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);
    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function (err) {console.warn('Error in getPlayersInfo: ', err);});
  }
};

module.exports = helpers;
