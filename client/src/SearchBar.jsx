import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      value: ''
    }
  }
  // Text from the input field is stored in this.state.value
  handleKeyDown(event){
    this.setState({value: event.target.value});
  }
  handleEnterKey(event){
    if (!(event.key === 'Enter')) {
      return;
    }
    this.props.lookUpArtist(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <div className="search">
        <input
          id="search-form"
          className='artist-lookup'
          placeholder="search artist"
          value={this.state.value}
          onKeyPress={this.handleEnterKey.bind(this)}
          onChange={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default SearchBar;
