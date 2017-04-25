import React, {Component} from 'react';

class Footer extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="footer-div">
        <div className="player__container">
          <div className="player__body">

            <div className="body__info">
              <div className="info__album">Album Name</div>

              <div className="info__song">Track Name</div>

              <div className="info__artist">Artist Name</div>
            </div>

            <div className="body__buttons">
              <ul className="list list--buttons">
                <li><a href="#" className="list__link"><i className="fa fa-step-backward"></i></a></li>

                <li><a href="#" className="list__link"><i className="fa fa-play"></i></a></li>

                <li><a href="#" className="list__link"><i className="fa fa-step-forward"></i></a></li>
              </ul>
            </div>
            <div className="player__footer">
              <ul className="list list--footer">
                <li><a href="#" className="list__link"><i className="fa fa-heart-o"></i></a></li>

                <li><a href="#" className="list__link"><i className="fa fa-random"></i></a></li>

                <li><a href="#" className="list__link"><i className="fa fa-undo"></i></a></li>

                <li><a href="#" className="list__link"><i className="fa fa-ellipsis-h"></i></a></li>
              </ul>
            </div>
          </div>



        </div>
      </div>
    )
  }
}

export default Footer;
// <div className="body__cover">
//   <ul className="list list--cover">
//     <li>
//       <a className="list__link" href=""><i className="fa fa-navicon"></i></a>
//     </li>
//
//     <li>
//       <a className="list__link" href=""></a>
//     </li>
//
//     <li>
//       <a className="list__link" href=""><i className="fa fa-search"></i></a>
//     </li>
//   </ul>
//
//   <img src="http://ecx.images-amazon.com/images/I/51XSHShbPiL.jpg" alt="Album cover" />
//
//   <div className="range"></div>
// </div>
