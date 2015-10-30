var React = require('react');
var Utils = require('./utils');

var OptionsList = React.createClass({
  render: function() {
    var optionsNodes = this.props.options.map(function(option, index) {
      if(this.props.isLast) {
        return (
          <p key={index}>{Utils.toLetters(index + 1)+ '.' + option.option}</p>
        );
      } else {
        return (
          <p key={index}>{Utils.toLetters(index + 1)+ '.' + option.option} <span className='right'>跳转到问题 {option.to}</span></p>
        );
      }
    }.bind(this));
    return (
      <div className="optionsList">
        {optionsNodes}
      </div>
    )
  }
});

module.exports = OptionsList;
