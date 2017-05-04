import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  // Text from the input field is stored in this.state.value
  handleKeyDown = (event) => {
    this.setState({value: event.target.value});
  }
  handleEnterKey = (event) => {
    if (!(event.key === 'Enter')) {
      return;
    }
    this.props.handleSearch(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <div className="search">
        <input
          id="search-form"
          className='artist-lookup'
          placeholder={this.props.placeholder}
          value={this.state.value}
          onKeyPress={this.handleEnterKey}
          onChange={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default SearchBar;
