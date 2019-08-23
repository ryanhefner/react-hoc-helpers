import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getDisplayName } from '.';

Enzyme.configure({
  adapter: new Adapter(),
});

/**
 * Test HOCs
 */
function withDisplayName(Component) {
  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <Component
        {...remainingProps}
        ref={wrappedComponentRef}
        withDisplayName
      />
    );
  };

  C.displayName = `withDisplayName(${getDisplayName(Component)})`;
  C.WrappedComponent = Component;

  return hoistStatics(C, Component);
}

/**
 * Test Components
 */
class DisplayNameComponent extends Component {
  static displayName = 'DisplayNameComponent';

  render() {
    const { withDisplayName } = this.props;
    return (
      <p>This component has a <code>displayName</code>: {withDisplayName ? 'true' : 'false'}</p>
    );
  }
}

const DisplayNameHOC = withDisplayName(DisplayNameComponent);

class NameComponent extends Component {
  render()  {
    const { withName } = this.props;
    return (
      <p>This component has a <code>name</code>: {withName ? 'true' : 'false'}</p>
    );
  }
}

const NameHOC = withDisplayName(NameComponent);

/**
 * Test
 */
describe('react-hoc-utils', () => {
  test('getDisplayName w/ displayName', () => {
    const Component = mount(<DisplayNameHOC />);
    expect(Component.name()).toBe('withDisplayName(DisplayNameComponent)');
  });

  test('getDisplayName w/ name', ()  => {
    const Component = mount(<NameHOC />);
    expect(Component.name()).toBe('withDisplayName(NameComponent)');
  });
});
