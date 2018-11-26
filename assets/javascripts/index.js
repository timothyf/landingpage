import React from 'react';
import ReactDOM from 'react-dom';

const HelloReact = props => (
  <div>Hello, React!</div>
);

function renderHello(id) {
  const el = document.getElementById(id); //selector);
  ReactDOM.render(<HelloReact />, el);
}

export default {
  renderHello
}
