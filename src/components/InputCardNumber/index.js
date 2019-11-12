import React, { PureComponent } from 'react';

import maskCardNumber from '../../decorators/maskCardNumber';

class InputCardNumber extends PureComponent {
  render() {
    const { inputRef, ...props } = this.props;

    return (
      <input ref={inputRef} {...props} />
    );
  }
}

export default maskCardNumber()(InputCardNumber);
