var React = require('react');
var Question = require('./question');

var Questions = React.createClass({
  editQuestion: function(id) {
    this.props.onEditQuestion(id);
  },
  deleteQuestion: function (id) {
    this.props.onDeleteQuestion(id);
  },
  render: function() {
    var questionNodes = this.props.data.map(function(question, index) {
      return (
        <Question
          onEditQuestion={this.editQuestion}
          onDeleteQuestion={this.deleteQuestion}
          id={question.id}
          title={question.title}
          image_url={question.image_url}
          options={question.options}
          index={index + 1}
          key={question.id}>
        </Question>
      );
    }.bind(this));
    return (
      <div className="questionList">
        {questionNodes}
      </div>
    );
  }
});

module.exports = Questions;
