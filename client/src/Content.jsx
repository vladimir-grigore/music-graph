import React, {Component} from 'react';
import Artist from './Artist.jsx';

class Content extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const artistEntry = Object.keys(this.props.data)
    .map(item => <Artist key={item} value={this.props.data[item].name} />);

    return (
      <ul>
        {artistEntry}
      </ul>
    )
  }
}

export default Content;
