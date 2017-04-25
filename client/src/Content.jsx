import React, {Component} from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderStructure: {}
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({folderStructure: nextProps})
  }
  render() {
    return (
      <div className="contentArtist">
        <h1> Artist Name: abba </h1>
      </div>
    )
  }
}

export default Content;
