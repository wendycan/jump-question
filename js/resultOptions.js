var React = require('react');
var $ = require('jquery');

var Utils = require('./utils');

var ResultOptions = React.createClass({
  deleteOption: function(e) {
    var option_id = $(e.currentTarget).parent().data('id');
    this.props.onDeleteOption(option_id);
  },
  render: function() {
    var optionsNodes = this.props.options.map(function(option, index) {
      if(this.props.isEdit == 'true') {
        return (
          <div data-id={index} key={index}>
            <p data-title={option.title} data-id={index} className='col-md-11'>
            <span className='brand-text'>{option.id}</span>{option.desc}
            </p>
            <p className='col-md-1' onClick={this.deleteOption}><a className="btn btn-xs btn-danger right">删除</a></p>
          </div>
        );
      } else {
        return (
          <p data-title={option.title} data-id={index} key={index}>
          <span className='brand-text'>{option.id}</span>{option.desc}
          </p>
        );
      }
    }.bind(this));//to pass this to function
    return (
      <div className="resultsList container">
        {optionsNodes}
      </div>
    )
  }
});

module.exports = ResultOptions;
