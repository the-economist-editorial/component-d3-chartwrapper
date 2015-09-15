import React from 'react';

import ImageCaption from '@economist/component-imagecaption';

const customData = require('./assets/data.json');

// Load raw data (is this right?)
// const customData = require('./assets/data.json');
export default class DigDeeper extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      expanded: React.PropTypes.bool,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      // data: './assets/data.json',
      expanded: false,
      maxHeight:"1000px"
    };
  }
  // DEFAULT PROPS ends

  // CONSTRUCTOR
  //    bind handleResize to this component
  //    set default state
  constructor(props) {
    super(props);
    this.state = {
      data: customData,
      expanded: this.props.expanded,
      heightSet: false,

    };
  }
  // CONSTRUCTOR ends

  // componentDidMount() {
  //   let maxHeight = document.getElementsByClassName("daily-features-expandable-content")[0].offsetHeight;
  //   console.log("Initial maxHeight = " + maxHeight);
  //   if (maxHeight > 0) {
  //     maxHeight += "px";
  //   }
  //   // console.log("Did update to " + maxHeight);
  //   document.getElementsByClassName("daily-features-expandable-content")[0].style.maxHeight = maxHeight;
  // }

  componentDidUpdate() {
    const myHeight = document.getElementsByClassName("daily-features-expandable-content")[0].offsetHeight;
    console.log("Current height of div = " + myHeight);
    let heightSet = this.state.heightSet;
    if (!heightSet && myHeight > 0) {
      // I.e., if I haven't overwritten the default CSS yet
      // console.log("I have one chance to reset the CSS now...");
      this.state.heightSet = true;
      this.rewriteExpandedCSS(myHeight);
    }
  }

  expandingButtonClick() {
    let expanded = this.state.expanded;
    this.setState({
      expanded: !expanded,
    });
  }

  rewriteExpandedCSS(maxHeight) {
    console.log("Reset CSS rule to maxheight of " + maxHeight);
    const mhStr = maxHeight + "px";
    // Find the rule:
    const allCSS = document.styleSheets;
    let cssLen = allCSS.length;
    const myCSSList = allCSS[cssLen - 1].cssRules;
    cssLen = myCSSList.length;
    const cssRule = myCSSList[cssLen - 1];
    console.log(cssRule.cssText);
    // cssRule.cssText = '\.expanded  { max-height: ' + maxHeight + 'px; transition: max-height 1s ease-out; }';
    cssRule.style.setProperty('max-height', mhStr, null)
    console.log(cssRule.cssText);
  }

  // RENDER
  render() {
    const data = this.state.data;
    // Image
    const imageSrc = data.image.src;
    const imageCaption = data.image.caption;
    const imgWrapper = (
      <div className = 'daily-features-map-wrapper'>
        <div>
          <ImageCaption caption={imageCaption} src={imageSrc}/>
        </div>
      </div>
    );
    // Extra text
    const textHead = data.text.header;
    const textBody = data.text.body;
    // Expanding div
    // Button strings
    const buttonOpenStr = 'Dig deeper';
    const buttonCloseStr = 'Close';
    let content = '';
        content = data.expandedcontent;
    // Expansion class
    let expansionClass = 'daily-features-expandable-content';
    if (this.state.expanded) {
      expansionClass += ' expanded'
    }
    //console.log('Set maxheight to ' + this.state.maxHeight);
    return (
      <div className="daily-features-outer-wrapper">
        <div className = "daily-features-image-wrapper">
            <ImageCaption className="daily-features-image-caption" caption={imageCaption} src={imageSrc}/>
        </div>
        <div className="daily-features-text-wrapper">
          <p className="daily-features-text-header">{textHead}</p>
          <p className="daily-features-text-body">{textBody}</p>
        </div>

        <div className="daily-features-expandable-wrapper">
          <div className={expansionClass}>
            {content}
          </div>
          <div className="daily-features-expandable-button-wrapper">
            <div className="daily-features-expandable-button"
              onClick={this.expandingButtonClick.bind(this)}>
              {buttonOpenStr}
            </div>
          </div>
        </div>

      </div>
    );
  }
  // RENDER ends
}
