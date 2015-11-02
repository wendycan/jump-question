var React = require('react');
var $ = require('jquery');

var OptionForm = React.createClass({
  handleOptionSubmit: function() {
    var title = React.findDOMNode(this.refs.title).value.trim();
    var to = React.findDOMNode(this.refs.option_to).value.trim();
    if (!title || ((!to) && (!$("#f-last").is(":checked") || $('#f-end-to').is(':checked')))) return
    this.props.onOptionSubmit({title: title, to: to, toEnd: $('#f-end-to').is(':checked')});
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.option_to).value = '';
    $('#f-end-to').val(false);
    $('#f-option').focus();
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-8">
          <input type="text" className="form-control" placeholder="选项内容" ref="title" id="f-option" />
        </div>
        <div className="col-md-3">
          <label htmlFor='f-end-to'>是否跳转到结果&nbsp;</label>
          <input type="checkbox" ref="endto" id="f-end-to" />
          <input className="form-control" placeholder="问题或结果序号" ref="option_to" id="f-option-to" />
        </div>
        <div className="col-md-1">
          <div className="btn btn-info" id="create-option" onClick={this.handleOptionSubmit}>添加选项</div>
        </div>
      </div>
    );
  }
});

module.exports = OptionForm;
