import React, {Component} from 'react';

class EventsModal extends Component {
  constructor(props) {
    super(props);
  }

  close = (e) => {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    if (this.props.isOpen === false) return null;
    let modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        background: '#fff'
      }

      let backdropStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndex: '9998',
        background: 'rgba(0, 0, 0, 0.3)'
      }

    return (
      <div> 
        <div style={backdropStyle} onClick={this.close}></div>
        <div style={modalStyle} className="events-modal">
          <h1>Modal title</h1>
          <p>hello</p>
        </div>
      </div>
    )
  }
}

export default EventsModal;
