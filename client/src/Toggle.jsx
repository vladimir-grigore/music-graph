import React, {Component} from 'react';

class Toggle extends Component {
  constructor(props){
    super(props);
  }

  get className() {
    return `collapse-button ${this.props.open ? 'open' : 'closed' }`
  }

  render() {
    return (
      <div className={this.className}>
        <a href="#" onClick={this.handleClick}><i className="fa fa-chevron-right"></i></a>
      </div>
    )
  }

  handleClick = (event) => {
    this.props.handleToggle();
  }
}

export default Toggle;
