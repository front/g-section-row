/**
 * External dependencies
 */
import React from 'react';
import { element, i18n, components, editor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';

const { Fragment } = element;
const { __ } = i18n;

// TODO: Chooose components for the sidebar settings
const {
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
  // IconButton,
  // Toolbar,
} = components;
const { InspectorControls, InnerBlocks /* , BlockControls */ } = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  width: {
    type: 'string',
    default: 'width-default',
  },
  fullHeight: {
    type: 'boolean',
    default: true,
  },
  split: {
    type: 'string',
    default: 'split-1-1',
  },
  columnGap: {
    type: 'string',
    default: 'column-gap-medium',
  },
  reverse: {
    type: 'boolean',
    default: false,
  },
};

export const name = 'section-layout-inner-two-columns';

export const settings = {
  title: __('Section Layout Inner Two Columns'),
  description: __('One column for use inside Section Layout Wrapper'),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,
  supports: {
    html: false,
  },
  parent: ['cloudblocks/section-layout-wrapper'],

  edit ({ attributes, className, setAttributes }) {
    const { width, fullHeight, split, columnGap, reverse } = attributes;

    const classes = [className];
    if (width) {
      classes.push(width);
    }
    if (fullHeight) {
      classes.push('full-height');
    }
    if (split) {
      classes.push(split);
    }
    if (columnGap) {
      classes.push(`column-gap-${columnGap}`);
    }
    if (reverse) {
      classes.push('column-reverse');
    }

    const spaceOptions = [
      { label: __('None'), value: '' },
      { label: __('XSmall'), value: 'xsmall' },
      { label: __('Small'), value: 'small' },
      { label: __('Medium'), value: 'medium' },
      { label: __('Large'), value: 'large' },
      { label: __('XLarge'), value: 'xlarge' },
      { label: __('XXLarge'), value: 'xxlarge' },
    ];

    const ALLOWED_BLOCKS = ['cloudblocks/section-layout-cell'];

    const TEMPLATE = [
      ['cloudblocks/section-layout-cell'],
      ['cloudblocks/section-layout-cell'],
    ];

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')}>
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={TEMPLATE}
            templateLock="all"
          />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={__('Columns')}>
            <PanelRow>
              <label htmlFor="split">Column Split</label>
              <SelectControl
                id="split"
                value={split}
                options={[
                  { label: __('One to One'), value: 'split-1-1' },
                  { label: __('One to Two'), value: 'split-1-2' },
                  { label: __('Two to One'), value: 'split-2-1' },
                  { label: __('One to Three'), value: 'split-1-3' },
                  { label: __('Three to One'), value: 'split-3-1' },
                  { label: __('One to Four'), value: 'split-1-4' },
                  { label: __('Four to One'), value: 'split-4-1' },
                ]}
                onChange={split => setAttributes({ split })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="column-gap">{__('Column Gap')}</label>
              <SelectControl
                id="column-gap"
                value={columnGap}
                options={spaceOptions}
                onChange={columnGap => setAttributes({ columnGap })}
              />
            </PanelRow>
            <PanelRow>
              <ToggleControl
                label={__('Column Reverse')}
                help={__(
                  'Columns will reverse on larger screens, but keep it\'s original order on smaller screens.'
                )}
                checked={reverse}
                onChange={() => setAttributes({ reverse: !reverse })}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title={__('Width and height')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="content-width">Content Width</label>
              <SelectControl
                id="content-width"
                value={width}
                options={[
                  { label: __('Default'), value: 'width-default' },
                  { label: __('Wide'), value: 'width-wide' },
                  { label: __('Full'), value: 'width-full' },
                  {
                    label: __('Full - No margin'),
                    value: 'width-full-no-margin',
                  },
                ]}
                onChange={width => setAttributes({ width })}
              />
            </PanelRow>
            <PanelRow>
              <ToggleControl
                label={__('Full Height')}
                checked={fullHeight}
                onChange={() => setAttributes({ fullHeight: !fullHeight })}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const { width, fullHeight, split, columnGap, reverse } = attributes;

    const classes = [className];
    if (width) {
      classes.push(width);
    }
    if (fullHeight) {
      classes.push('full-height');
    }
    if (split) {
      classes.push(split);
    }
    if (columnGap) {
      classes.push(`column-gap-${columnGap}`);
    }
    if (reverse) {
      classes.push('column-reverse');
    }

    return (
      <div className={classes.join(' ')}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
