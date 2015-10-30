var React = require('react');

var Result = React.createClass({
  render: function() {
    var questionNodes = this.props.data.map(function(question, index) {
      var _index = index;
      var optionsNodes = question.options.map(function(option, index) {
        return (
          <li key={index} style={{listStyle: 'none'}} data-to={option.to} data-option-index={index+1}>
          <input type="radio" name={_index} value={index} id={"f-option-" + _index + '-' + index}/>
          <label htmlFor={"f-option-" + _index + '-' + index}>{option.title}</label>
          </li>
        );
      });
      var display = index == 0? 'block':'none';
      return (
        <li key={index} className="bm_question" data-islast={question.isLast} data-question-id={index+1} style={{listStyle: 'none', display: display}}>
          <h4>{ index + 1 + '.  ' + question.title }</h4>
          <img src={question.image_url} />
          <ul className="bm_optionList">{optionsNodes}</ul>
        </li>
      );
    });
    var resultNodes = this.props.result.map(function(r,index) {
      return (
        <li data-result-index={index+1} style={{listStyle: 'none',display: 'none'}}>
          <p>{r.desc}</p>
        </li>
      );
    });

    return (
      <div className="bm_page">
        <h3>{this.props.meta.title}</h3>
        <p>{this.props.meta.desc}</p>
        <ul className="bm_questionList">
          {questionNodes}
        </ul>
        <ul className="bm_results" style={{display: 'none'}}>
          {resultNodes}
        </ul>
      </div>
    );
  }
});

module.exports = Result;
