import React from 'react';
import D3BarChart from '@economist/component-d3-barchart';
// Load raw data (is this OK?)
//const customData = require('./assets/data.json');
export default class D3ChartWrapper extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      dimensions: React.PropTypes.object,
      duration: React.PropTypes.number,
      data: React.PropTypes.object,
      test: React.PropTypes.string,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      duration: 1000,
    };
  }
  // DEFAULT PROPS ends

  // CONSTRUCTOR
  //    bind handleResize to this component
  //    set default state
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.counter,
      data: this.props.data,
    };
  }
  // CONSTRUCTOR ends

  // COMPONENT DID MOUNT
  componentDidMount() {
  }
  // COMPONENT DID MOUNT ends

  // GET BOUNDS
  // Calculates child component's d3 margins
  getBounds(dimensions) {
    const margins = this.state.data.margins;
    // console.log(margins);
    const outerH = dimensions.height;
    const outerW = dimensions.width;
    const innerW = outerW - margins.left - margins.right;
    const innerH = outerH - margins.top - margins.bottom;
    return {
      'left': margins.left,
      'top': margins.top,
      'width': innerW,
      'height': innerH,
    };
  }
  // GET BOUNDS ends


  // RENDER
  // While I'm doing the sneaky trick with the counter,
  // assemble the data object and throw it at the component
  render() {
    const config = this.state.data;
    // For now, duration of d3 transitions (not that there are any!) is defined here
    config.duration = this.props.duration;
    // D3 bounds are derived from the data.
    // *** this is actually a bit self-reflexive... reconsider...? ***
    config.bounds = this.getBounds(config.dimensions);
    // Now: what style?
    let childComponent;
    switch (config.style) {
      case 'bars':
        childComponent = <D3BarChart config={config}/>;
        break;
      // Other styles to come...
      default:
        childComponent = <D3BarChart config={config}/>;
        break;
    }
    // Embed whichever child component in the outer wrapper:
    return (
      <div className="d3-chart-outer-wrapper" style={config.dimensions}>
        {childComponent}
      </div>
    );
  }
  // RENDER ends
}
