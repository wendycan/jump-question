var React = require('react');
var $ = require('jquery');

var OptionForm = React.createClass({
  handleOptionSubmit: function() {
    var option = React.findDOMNode(this.refs.option).value.trim();
    var to = React.findDOMNode(this.refs.option_to).value.trim();
    if (!option || ((!to || to <= 0) && !$("input[type='checkbox']").is(":checked"))) return
    this.props.onOptionSubmit({option: option, to: to});
    React.findDOMNode(this.refs.option).value = '';
    React.findDOMNode(this.refs.option_to).value = '';
    $('#f-option').focus();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-9">
          <input type="text" className="form-control" placeholder="选项内容" ref="option" id="f-option" />
        </div>
        <div className="col-md-2">
          <input type="number" min='1' className="form-control" placeholder="跳转到问题序号" ref="option_to" id="f-option-to" />
        </div>
        <div className="col-md-1">
          <div className="btn btn-info" id="create-option" onClick={this.handleOptionSubmit}>添加</div>
        </div>
      </div>
    );
  }
});

module.exports = OptionForm;
