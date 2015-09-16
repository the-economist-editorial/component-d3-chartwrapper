import React from 'react';
import D3BarChart from '@economist/component-d3-barchart';
// Load raw data (is this OK?)
const customData = require('./assets/data.json');
export default class D3ChartWrapper extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      counter: React.PropTypes.number,
      dimensions: React.PropTypes.object,
      duration: React.PropTypes.number,
      hardData: React.PropTypes.array,
      test: React.PropTypes.string,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      // Counter is just for demonstration purposes
      counter: 0,
      duration: 1000,
      dimensions: { outerWidth: 500, outerHeight: 300 },
      // Array of hard data: another node is called on each increment
      // of the counter
      // Now loading data from external file... above
      hardData: [
        // 0
        {
          data: [
            { 'category': 'Twenty', 'value': 20 },
            { 'category': 'Forty', 'value': 40 },
            { 'category': 'Sixty', 'value': 60 },
            { 'category': 'Eighty', 'value': 80 },
          ],
          margins: { top: 30, right: 30, bottom: 30, left: 100 },
          xDomain: [ 0, 80 ],
          yDomain: [],
          xOrient: 'bottom',
          yOrient: 'left',
          style: 'bars',
        },
        // 1
        {
          data: [
            { 'category': 'Nineteen', 'value': 19 },
            { 'category': 'Thirtytwo', 'value': 32 },
            { 'category': 'Forth', 'value': 40 },
            { 'category': 'Four', 'value': 4 },
          ],
          margins: { top: 30, right: 30, bottom: 30, left: 100 },
          xDomain: [ 0, 40 ],
          yDomain: [],
          xOrient: 'top',
          yOrient: 'left',
          style: 'bars',
        },
        // 2
        {
          data: [
            { 'category': 'One-twenty', 'value': 120 },
            { 'category': 'One-thirtytwo', 'value': 132 },
            { 'category': 'Sixty', 'value': 60 },
            { 'category': 'Seventyfive', 'value': 75 },
          ],
          margins: { top: 30, right: 30, bottom: 30, left: 100 },
          xDomain: [ 0, 150 ],
          yDomain: [],
          xOrient: 'bottom',
          yOrient: 'left',
          style: 'bars',
        },
      ],
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
      data: customData,
    };
  }
  // CONSTRUCTOR ends

  // COMPONENT DID MOUNT
  // For ***TESTING***, just sets a couple of timeouts and increments
  // a counter to kickstart re-render with new data...
  componentDidMount() {
    const counter1 = this.state.counter + 1;
    const counter2 = this.state.counter + 2;
    setTimeout(() => {
      this.setState({ 'counter': counter1 });
    }, 5000);
    setTimeout(() => {
      this.setState({ 'counter': counter2 });
    }, 10000);
  }
  // COMPONENT DID MOUNT ends

  // GET BOUNDS
  // Calculates child component's d3 margins
  getBounds(counter) {
    const dimensions = this.props.dimensions;
    // console.log(dimensions);
    // const margins = this.props.hardData[counter].margins;
    const margins = this.state.data[counter].margins;
    // console.log(margins);
    const outerH = dimensions.outerHeight;
    const outerW = dimensions.outerWidth;
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
    // For now, at least, component size is set with an inline style
    const chartDims = {
      height: this.props.dimensions.outerHeight,
      width: this.props.dimensions.outerWidth,
    };
    // Configuration
    const counter = this.state.counter;
    // const config = this.props.hardData[counter];
    const config = this.state.data[counter];
    // Other, 'higher-level' properties:
    config.duration = this.props.duration;
    config.bounds = this.getBounds(counter);
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
      <div className="d3-chart-outer-wrapper" style={chartDims}>
        {childComponent}
      </div>
    );
  }
  // RENDER ends
}
