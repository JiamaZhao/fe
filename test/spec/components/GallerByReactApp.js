'use strict';

describe('GallerByReactApp', () => {
  let React = require('react/addons');
  let GallerByReactApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    GallerByReactApp = require('components/GallerByReactApp.js');
    component = React.createElement(GallerByReactApp);
  });

  it('should create a new instance of GallerByReactApp', () => {
    expect(component).toBeDefined();
  });
});
