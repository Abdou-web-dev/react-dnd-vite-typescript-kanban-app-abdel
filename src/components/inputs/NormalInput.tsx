import { InputProps } from '@chakra-ui/react';
import React, { useState } from 'react';

export const NormalInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [textValue, setTextValue] = useState<string>('');

    return (
      <>
        <input
          ref={ref}
          type="text"
          value={textValue}
          //   {...props}
          onChange={(e) => setTextValue(e.target.value)}
        />{' '}
      </>
    );
  },
);
