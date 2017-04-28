import React, {Component} from 'react';
import Artist from './Artist.jsx';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const artistEntry = Object.keys(this.props.data)
    .map(item => <Artist key={item} 
                         id={item} 
                         value={this.props.data[item].name} 
                         albums={this.props.data[item].albums} 
                         color={this.props.data[item].color}
                         artistMenuClick={this.props.artistMenuClick}
                         />);
    return (
      <div className="artistEntry" id="content-wrapper">
        <ul className="nav content-nav" id="scroll-area">
          {artistEntry}
        </ul>
      </div>
    )
  }
}

export default Content;
