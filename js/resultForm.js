var React = require('react');
var ResultOptionForm = require('./resultOptionForm');
var ResultOptions = require('./resultOptions');

var ResultForm = React.createClass({
  count: 0,

  getInitialState: function() {
    this.count = this.props.count;
    return {options: this.props.data};
  },

  deleteOption: function(index) {
    var options = this.state.options;
    options.splice(index,1);
    this.setState({options: options});
  },
  handleResultOptionSubmit: function(option) {
    option.id = 'r' + this.count++;
    var options = this.state.options;
    options.push(option);
    this.setState({options: options});
    this.props.onResultSubmit({result: this.state.options, count:this.count})
  },
  handleSubmitForm: function (e) {
    e.preventDefault();
  },
  render: function() {
    return (
      <form className="resultForm" onSubmit={this.handleSubmitForm}>
        <div className="clearfix">
          <ResultOptionForm onResultOptionSubmit={this.handleResultOptionSubmit}/>
          <ResultOptions options={this.state.options} onDeleteOption={this.deleteOption} isEdit='true'/>
        </div>
      </form>
    )
  }
});

module.exports = ResultForm;
