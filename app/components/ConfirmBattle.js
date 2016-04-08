var React = require('react');

var ConfirmBattle = props => {
  return props.isLoading === true
    ? <p> Loading </p>
    : <p> Confirm Battle </p>
};

module.exports = ConfirmBattle;
