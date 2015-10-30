var React = require('react');
var Question = require('./question');

var Questions = React.createClass({
  editQuestion: function(id) {
    this.props.onEditQuestion(id);
  },
  render: function() {
    var questionNodes = this.props.data.map(function(question, index) {
      return (
        <Question onEditQuestion={this.editQuestion} title={question.title} isLast={question.isLast} image_url={question.image_url} options={question.options} index={index + 1} key={index}>
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
