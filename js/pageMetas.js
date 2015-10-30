var React = require('react');

var PageMetas = React.createClass({
  render: function() {
    return (
      <div>
        <h3>{this.props.data.title}</h3>
        <p>{this.props.data.desc}</p>
      </div>
    );
  }
});

module.exports = PageMetas;
