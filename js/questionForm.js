var React = require('react');
var $ = require('jquery');
var OptionForm = require('./optionForm');
var Options = require('./options');

var QuestionForm = React.createClass({
  getInitialState: function() {
    if(this.props.isEdit){
      return {options: this.props.question.options};
    } else {
      return {options: []};
    }
  },
  deleteOption: function(index) {
    var options = this.state.options;
    options.splice(index,1);
    this.setState({options: options});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var url = React.findDOMNode(this.refs.url).value.trim();
    if (!title || this.state.options.length < 1) {
      return;
    }

    if(this.props.isEdit){
      this.props.onQuestionSubmit({title: title, options: this.state.options, image_url: url},this.props.question_id.id);
    } else {
      this.props.onQuestionSubmit({title: title, options: this.state.options, image_url: url});
    }
    $('#question-container').empty();
  },
  handleOptionSubmit: function(option) {
    var options = this.state.options;
    options.push(option);
    this.setState({options: options});
  },

  lastStatuschange: function() {
    if ($("input[type='checkbox']").is(":checked")) {
      $('#f-option-to').prop('disabled', true);
      $('#f-end-to').prop('disabled', true);
      $('.optionsList .right').css('display','none');
    } else {
      $('#f-option-to').prop('disabled', false);
      $('#f-end-to').prop('disabled', false);
    }
  },
  render: function() {
    return (
      <form className="questionForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="f-title">问题</label>
          <input type="text" className="form-control" placeholder="标题" ref="title" id="f-title" defaultValue={this.props.question&&this.props.question.title} />
        </div>
        <div className="form-group">
          <label htmlFor="f-url">图片地址</label>
          <input type="text" className="form-control" placeholder="图片地址" ref="url" id="f-url" defaultValue={this.props.question&&this.props.question.image_url} />
        </div>
        <div className="form-group">
          <label htmlFor="f-option">选项</label>
          <OptionForm onOptionSubmit={this.handleOptionSubmit}/>
          <Options options={this.state.options} onDeleteOption={this.deleteOption}></Options>
        </div>
        <button type="submit" className="btn btn-primary">添加</button>
      </form>
    );
  }
});

module.exports = QuestionForm;
