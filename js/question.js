var React = require('react');
var OptionsList = require('./optionsList');

var Question = React.createClass({
  edit: function() {
    this.props.onEditQuestion(this.props.id);
  },
  deleteQuestion: function () {
    if(confirm('确定删除这个问题？')){
      this.props.onDeleteQuestion(this.props.id)
    }
  },
  render: function() {
    return (
      <div className="question">
        <h4>
          <span className="brand-text">{this.props.id}</span>{this.props.title}
          <a onClick={this.deleteQuestion} className='right btn btn-xs btn-danger'>删除</a>
          <a onClick={this.edit} className='right btn btn-xs btn-info'>编辑</a>
        </h4>
        <img src={this.props.image_url}/>
        <OptionsList options={this.props.options}></OptionsList>
      </div>
    );
  }
});

module.exports = Question;
