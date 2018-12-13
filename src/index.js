import { blocks, data, i18n } from 'wp';
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { __ } = i18n;

// TODO: Import each block herer
import * as block1 from './section-row';
import * as block2 from './section-row-inner-one-column';
import * as block3 from './section-row-inner-two-columns';
import * as block4 from './section-row-inner-gallery';
import * as block5 from './section-row-cell';

// Category name and slug
const category = {
  slug: 'cloudblocks', // needs to match the css class of the block container: ".wp-block-cloudblocks-[block-name]"
  title: __('Cloud Blocks'),
};

// Register the new category and blocks
export function registerBlocks () {
  // Add the new category to the list
  const currentCategories = select('core/blocks')
  .getCategories()
  .filter(item => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([category, ...currentCategories]);

  // TODO: Register each block
  registerBlockType(`${category.slug}/${block1.name}`, {
    category: category.slug,
    ...block1.settings,
  });
  registerBlockType(`${category.slug}/${block2.name}`, {
    category: category.slug,
    ...block2.settings,
  });
  registerBlockType(`${category.slug}/${block3.name}`, {
    category: category.slug,
    ...block3.settings,
  });
  registerBlockType(`${category.slug}/${block4.name}`, {
    category: category.slug,
    ...block4.settings,
  });
  registerBlockType(`${category.slug}/${block5.name}`, {
    category: category.slug,
    ...block5.settings,
  });
}

registerBlocks();
