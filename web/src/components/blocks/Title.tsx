/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';

import TitleBreaker from './TitleBreaker';
import { updateServer } from '../../lib/pageController';
import { PermanentEditableText } from '../../lib/types/blockTypes';

const Title = (props: PermanentEditableText) => {
  const {
    page,
    blockID,
    properties,
    addBlockAtIndex,
  } = props;
  const { value: titleString } = properties;

  const onTitleChanged = (text: string) => {
    updateServer(blockID, undefined, { value: text }, undefined, page);
  };

  return (
    <>
      <span
        className="text-5xl font-bold outline-none empty:before:content-['Untitled'] empty:before:opacity-30"
        contentEditable
        role="textbox"
        tabIndex={0}
        onBlur={
          (e) => {
            onTitleChanged(e.currentTarget.innerText);
          }
        }
        suppressContentEditableWarning
        onKeyDown={
          (e) => {
            if (e.code === 'Enter') {
              e.preventDefault();
              e.currentTarget.blur();
              addBlockAtIndex();
            }
          }
        }
      >
        {titleString}
      </span>
      <TitleBreaker />
    </>
  );
};

export default Title;