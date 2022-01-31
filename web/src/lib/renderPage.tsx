import React from 'react';

import Items from '../components/page/Items';
import TextBlock from '../components/page/TextBlock';

const RenderItem = (itemData: {
    blockType: string,
    properties: any,
    style: any,
    blockID: string,
  }, page: string) => {
  const {
    blockType,
    properties,
    blockID,
  } = itemData;

  switch (blockType) {
    case 'page-icon':
      return <Items.Icon icon={properties.value} page={page} blockID={blockID} />;
    case 'page-title':
      return <Items.Title titleString={properties.value} page={page} blockID={blockID} />;
    default:
      return (
        <TextBlock
          blockID={blockID}
          page={page}
          value={properties.value}
          typeOfText={blockType}
        />
      );
  }
};

const RenderPage = (
  pageData: { blockType: string, properties: any, style: any, blockID: string }[],
  page: string,
) => pageData.map((item) => RenderItem(item, page));

export default RenderPage;
