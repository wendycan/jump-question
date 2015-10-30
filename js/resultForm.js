var React = require('react');
var ResultOptionForm = require('./resultOptionForm');
var ResultOptions = require('./resultOptions');

var ResultForm = React.createClass({
  getInitialState: function() {
    return {options: this.props.data};
  },
  deleteOption: function(index) {
    var options = this.state.options;
    options.splice(index,1);
    this.setState({options: options});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onResultSubmit(this.state.options);
  },
  handleResultOptionSubmit: function(option) {
    var options = this.state.options;
    options.push(option);
    this.setState({options: options});
  },
  render: function() {
    return (
      <form className="ResultForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <ResultOptionForm onResultOptionSubmit={this.handleResultOptionSubmit}/>
          <ResultOptions options={this.state.options} onDeleteOption={this.deleteOption} isEdit='true'/>
        </div>
        <button type="submit" className="btn btn-primary">更新</button>
      </form>
    )
  }
});

module.exports = ResultForm;
