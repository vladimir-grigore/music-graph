import React, {Component} from 'react';

class Toggle extends Component {
  constructor(props){
    super(props);
  }

  // get className() {
  //   return `collapse-button ${this.props.className ? 'open' : 'closed' }`
  // }

  render() {
    return (
      <div className={`collapse-button ${this.props.className}`}>
        <a href="#" onClick={this.handleClick}><i className="fa fa-chevron-right"></i></a>
      </div>
    )
  }

  handleClick = (event) => {
    const parent = event.target.parentNode.parentNode;
    const parentName = parent.className.split(' ')[1];
    this.props.handleToggle(parentName);
  }
}

export default Toggle;
