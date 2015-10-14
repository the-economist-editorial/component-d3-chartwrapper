import React from 'react';
import ChartWrapper from '@economist/component-d3-chartwrapper';
export default class StylesPrint extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      data: React.PropTypes.object,
      dimensions: React.PropTypes.object,
      test: React.PropTypes.string,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  static get defaultProps() {
    return {};
  }
  // DEFAULT PROPS ends

  // CONSTRUCTOR
  //    bind handleResize to this component
  //    set default state
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  // CONSTRUCTOR ends

  // COMPONENT DID MOUNT
  componentDidMount() {
  }
  // COMPONENT DID MOUNT ends


  // RENDER
  // A note on structure. There's an outermost-wrapper to
  // wrap *everything*. Then the mainouter-wrapper holds the main content;
  // and there's a sticky footer-wrapper at the bottom...
  render() {
    const data = this.state.data;
    return (
      <ChartWrapper data={data}/>
    );
  }
  // RENDER ends
}
