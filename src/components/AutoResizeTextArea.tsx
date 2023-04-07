import { Textarea, TextareaProps } from '@chakra-ui/react';
import React from 'react';
import ResizeTextarea from 'react-textarea-autosize';

// eslint-disable-next-line react/display-name
export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  return (
    <>
      <Textarea as={ResizeTextarea} minH="unset" ref={ref} {...props} />
    </>
  );
});

/* The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within. */

// <ResizeTextarea
//         defaultValue={``}
//         onChange={(e) => {
//           alert(e.target.value);
//         }}
//         name="test"
//       ></ResizeTextarea>
