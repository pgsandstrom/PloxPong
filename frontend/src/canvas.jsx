import React from 'react';

class Canvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <canvas id="canvas" width="500" height="500" />;
  }
}
export default Canvas;
