var React = require('react');
var $ = require('jquery');

var ResultOptionForm = React.createClass({
  handleOptionSubmit: function() {
    var desc = React.findDOMNode(this.refs.r_option_desc).value.trim();
    if(!desc) return;
    this.props.onResultOptionSubmit({desc: desc});
    React.findDOMNode(this.refs.r_option_desc).value = '';
    $('#f-option-desc').focus();
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-10">
          <input type="text" className="form-control" placeholder="内容" ref="r_option_desc" id="r-option-desc" />
        </div>
        <div className="col-md-2">
          <div className="btn btn-info right" id="create-option" onClick={this.handleOptionSubmit}>添加</div>
        </div>
      </div>
    );
  }
});

module.exports = ResultOptionForm;
