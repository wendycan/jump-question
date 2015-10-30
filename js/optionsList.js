var React = require('react');
var Utils = require('./utils');

var OptionsList = React.createClass({
  render: function() {
    var optionsNodes = this.props.options.map(function(option, index) {
      if(this.props.isLast) {
        return (
          <p key={index}>{Utils.toLetters(index + 1)+ '.' + option.title}</p>
        );
      } else {
        return (
          <p key={index}>{Utils.toLetters(index + 1)+ '.' + option.title} <span className='right'>{option.toEnd ? '跳转到结果' : '跳转到问题'} {option.to}</span></p>
        );
      }
    }.bind(this));
    return (
      <div className="optionsList row">
        <hr />
        {optionsNodes}
      </div>
    )
  }
});

module.exports = OptionsList;
