var React = require('react');

var PageForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    this.props.onPageSubmit({
      title: React.findDOMNode(this.refs.title).value.trim(),
      desc: React.findDOMNode(this.refs.desc).value.trim()
    });
  },
  render: function() {
    return (
      <form className="PageForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="f-p-title">标题</label>
          <input type="text" className="form-control" placeholder="标题" ref="title" id="f-p-title" defaultValue={this.props.data.title} />
        </div>
        <div className="form-group">
          <label htmlFor="f-p-desc">描述</label>
          <textarea className="form-control" placeholder="描述" row="5" ref="desc" id="f-p-desc" defaultValue={this.props.data.desc}/>
        </div>
        <button type="submit" className="btn btn-primary">更新</button>
      </form>
    );
  }
});

module.exports = PageForm;
