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

const { PanelBody, PanelRow, SelectControl, ToggleControl } = components;

const { InspectorControls, InnerBlocks } = editor;

const BLOCK_ATTRIBUTES = {
  width: {
    type: 'string',
  },
  fullHeight: {
    type: 'boolean',
    default: true,
  },
  marginTop: {
    type: 'string',
  },
  marginBottom: {
    type: 'string',
  },
  paddingTop: {
    type: 'string',
  },
  paddingBottom: {
    type: 'string',
  },
};

const ALLOWED_BLOCKS = ['cloudblocks/section-row-cell'];

const TEMPLATE = [['cloudblocks/section-row-cell']];

export const name = 'section-row-inner-one-column';

export const settings = {
  title: __('Inner One Column Row'),
  description: __('One column row for use inside Section Row block'),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,
  supports: {
    html: false,
  },
  parent: ['cloudblocks/section-row'],

  edit ({ attributes, className, setAttributes }) {
    const {
      width,
      fullHeight,
      marginTop,
      marginBottom,
      paddingTop,
      paddingBottom,
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
      { label: __('Auto'), value: '' },
      { label: __('Auto with margins'), value: 'width-margins' },
      { label: __('Wide'), value: 'width-wide' },
      { label: __('Narrow'), value: 'width-narrow' },
    ];

    const classes = ['edit', className];
    if (width) {
      classes.push(width);
    }
    if (fullHeight) {
      classes.push('height-full');
    }
    if (marginTop) {
      classes.push(`margin-top-${marginTop}`);
    }
    if (marginBottom) {
      classes.push(`margin-bottom-${marginBottom}`);
    }
    if (paddingTop) {
      classes.push(`padding-top-${paddingTop}`);
    }
    if (paddingBottom) {
      classes.push(`padding-bottom-${paddingBottom}`);
    }

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
            <PanelRow>
              <label htmlFor="padding-top">{__('Padding Top')}</label>
              <SelectControl
                id="padding-top"
                value={paddingTop}
                options={spaceOptions}
                onChange={paddingTop => setAttributes({ paddingTop })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="padding-bottom">{__('Padding Bottom')}</label>
              <SelectControl
                id="padding-bottom"
                value={paddingBottom}
                options={spaceOptions}
                onChange={paddingBottom => setAttributes({ paddingBottom })}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title={__('Width and Height')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="row-width">{__('Inner row width')}</label>
              <SelectControl
                id="row-width"
                value={width}
                options={widthOptions}
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
    const {
      width,
      fullHeight,
      marginTop,
      marginBottom,
      paddingTop,
      paddingBottom,
    } = attributes;

    const classes = ['save', className];
    if (width) {
      classes.push(width);
    }
    if (fullHeight) {
      classes.push('height-full');
    }
    if (marginTop) {
      classes.push(`margin-top-${marginTop}`);
    }
    if (marginBottom) {
      classes.push(`margin-bottom-${marginBottom}`);
    }
    if (paddingTop) {
      classes.push(`padding-top-${paddingTop}`);
    }
    if (paddingBottom) {
      classes.push(`padding-bottom-${paddingBottom}`);
    }

    return (
      <div className={classes.join(' ')}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
