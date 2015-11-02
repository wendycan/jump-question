var React = require('react');
var OptionsList = require('./optionsList');

var Question = React.createClass({
  edit: function() {
    this.props.onEditQuestion({id:this.props.index-1});
  },
  render: function() {
    return (
      <div className="question">
        <h4>问题{this.props.id}：{this.props.title}<a onClick={this.edit} className='right'>编辑</a></h4>
        <img src={this.props.image_url}/>
        <OptionsList options={this.props.options} isLast={this.props.isLast}></OptionsList>
      </div>
    );
  }
});

module.exports = Question;
