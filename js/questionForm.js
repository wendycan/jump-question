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
    var isLast = $('#f-option-to').prop('disabled');
    if (!title || this.state.options.length < 1) {
      return;
    }

    if(this.props.isEdit){
      this.props.onQuestionSubmit({title: title, options: this.state.options, image_url: url, isLast: isLast},this.props.question_id.id);
    } else {
      this.props.onQuestionSubmit({title: title, options: this.state.options, image_url: url, isLast: isLast});
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
      $('.optionsList .right').css('display','none');
    } else {
      $('#f-option-to').prop('disabled', false);
    }
  },
  componentDidMount: function() {
    if(this.props.question && this.props.question.isLast) {
      $("#f-last").prop('checked', true);
    } else {
      $("#f-last").prop('checked', false);
    }
  },
  render: function() {
    return (
      <form className="questionForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input id="f-last" ref="last" type="checkbox" onChange={this.lastStatuschange} />
          <label htmlFor="f-last">&nbsp;是最后一个问题</label>
        </div>
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
        <button type="submit" className="btn btn-primary">保存</button>
      </form>
    );
  }
});

module.exports = QuestionForm;
