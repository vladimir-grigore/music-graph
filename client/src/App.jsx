const React = require('react');

class App extends React.Component {
  render() {
    return (
      <h1>Welcome to {this.props.name} who have come to Zombo.com</h1>
    );
  }
}

module.exports = App;

