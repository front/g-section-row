/**
 * External dependencies
 */
import React from 'react';
import { element, i18n, components, blockEditor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

const { Fragment } = element;
const { __ } = i18n;

// TODO: Chooose components for the sidebar settings
const { PanelBody, PanelRow, SelectControl, ToggleControl } = components;
const { InspectorControls, InnerBlocks } = blockEditor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  width: {
    type: 'string',
  },
  split: {
    type: 'string',
    default: 'split-1-1',
  },
  columnGap: {
    type: 'string',
    default: 'medium',
  },
  reverse: {
    type: 'boolean',
    default: false,
  },
  marginTop: {
    type: 'string',
  },
  marginBottom: {
    type: 'string',
  },
};

const ALLOWED_BLOCKS = ['cloudblocks/section-row-cell'];

const TEMPLATE = [
  ['cloudblocks/section-row-cell'],
  ['cloudblocks/section-row-cell'],
];

export const name = 'section-row-inner-two-columns';

export const settings = {
  title: __('Inner Two Columns Row'),
  description: __('Two columns row for use inside Section Row block'),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,
  supports: {
    html: false,
  },
  parent: ['cloudblocks/section-row'],

  edit ({ attributes, className, setAttributes }) {
    const {
      width,
      split,
      columnGap,
      reverse,
      marginTop,
      marginBottom,
    } = attributes;

    const spaceOptions = [
      { label: __('None'), value: '' },
      { label: __('XSmall'), value: 'xsmall' },
      { label: __('Small'), value: 'small' },
      { label: __('Medium'), value: 'medium' },
      { label: __('Large'), value: 'large' },
      { label: __('XLarge'), value: 'xlarge' },
      { label: __('XXLarge'), value: 'xxlarge' },
    ];

    const widthOptions = [
      { label: __('Default'), value: '' },
      { label: __('Wide'), value: 'wide' },
      { label: __('Full width'), value: 'full' },
    ];

    const classes = ['edit', className];
    if (width) {
      classes.push(width);
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
    if (marginTop) {
      classes.push(`margin-top-${marginTop}`);
    }
    if (marginBottom) {
      classes.push(`margin-bottom-${marginBottom}`);
    }

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')}>
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={TEMPLATE}
            templateLock="insert"
          />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody>
            <PanelRow>
              <label htmlFor="split">{__('Column Split')}</label>
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
          <PanelBody title={__('Vertical space')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="margin-top">{__('Margin Top')}</label>
              <SelectControl
                id="margin-top"
                value={marginTop}
                options={spaceOptions}
                onChange={marginTop => setAttributes({ marginTop })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="margin-bottom">{__('Margin Bottom')}</label>
              <SelectControl
                id="margin-bottom"
                value={marginBottom}
                options={spaceOptions}
                onChange={marginBottom => setAttributes({ marginBottom })}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title={__('Width')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="row-width">{__('Inner row width')}</label>
              <SelectControl
                id="row-width"
                value={width}
                options={widthOptions}
                onChange={width => setAttributes({ width })}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const {
      width,
      split,
      columnGap,
      reverse,
      marginTop,
      marginBottom,
    } = attributes;

    const classes = ['save', className];
    if (width) {
      classes.push(width);
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
    if (marginTop) {
      classes.push(`margin-top-${marginTop}`);
    }
    if (marginBottom) {
      classes.push(`margin-bottom-${marginBottom}`);
    }

    return (
      <div className={classes.join(' ')}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
