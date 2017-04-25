import React, {Component} from 'react';

class Toggle extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="icon-bar">
        <a href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-caret-right"></i></a>
      </div>
    )
  }

  handleClick(event) {
    this.props.handleToggle();
  }
}

export default Toggle;
