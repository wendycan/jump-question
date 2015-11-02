var React = require('react');
var $ = require('jquery');

var Utils = require('./utils');

var Options = React.createClass({
  deleteOption: function(e) {
    var index = e.target.parentNode.getAttribute('data-id');
    this.props.onDeleteOption(index);
  },
  render: function() {
    var optionsNodes = this.props.options.map(function(option, index) {
      if($('#f-option-to').prop('disabled')){
        return (
          <div data-id={index} key={index}>
            <p className='col-md-11' data-title={option.title} data-id={index} key={index}>
            {Utils.toLetters(index + 1)+ '.' + option.title}
            </p>
            <p className='col-md-1' onClick={this.deleteOption}><a>删除</a></p>
          </div>
        );
      } else {
        return (
          <div data-id={index} key={index}>
            <p className='col-md-11' data-title={option.title} data-id={index} key={option.id}>
            {Utils.toLetters(index + 1)+ '.' + option.title} <span className='right'>{option.toEnd ? '跳转到结果' : '跳转到问题'} {option.to}</span>
            </p>
            <p className='col-md-1' onClick={this.deleteOption}><a>删除</a></p>
          </div>
        );
      }
    }.bind(this));//to pass this to function
    return (
      <div className="optionsList">
        {optionsNodes}
      </div>
    )
  }
});

module.exports = Options;
