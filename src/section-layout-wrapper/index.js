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
const { PanelBody, PanelRow, SelectControl, IconButton, Toolbar } = components;
const { InspectorControls, InnerBlocks, BlockControls } = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  width: {
    type: 'string',
    default: 'width-full',
  },
  backgroundImageUrl: {
    type: 'string',
  },
  backgroundImagePosition: {
    type: 'string',
    // default: 'center center',
  },
  backgroundImageSize: {
    type: 'string',
    default: 'cover',
  },
  overlayColor: {
    type: 'string',
  },
  // overlayOpacity: 1,
  paddingTop: {
    type: 'string',
  },
  paddingBottom: {
    type: 'string',
  },
  marginTop: {
    type: 'string',
  },
  marginBottom: {
    type: 'string',
  },
  height: {
    type: 'string',
    default: 'auto',
  },
  // scrollBtn: {
  //   type: 'bool',
  //   default: false,
  // },
};

export const name = 'section-layout-wrapper';

export const settings = {
  title: __('Section Layout Wrapper'),
  description: __('Flexible wrapper with background and spacing options'),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,
  supports: {
    html: false,
  },

  edit ({ attributes, className, setAttributes }) {
    const {
      // width,
      // backgroundImageUrl,
      // backgroundImagePosition,
      // backgroundImageSize,
      // overlayColor,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      height,
    } = attributes;

    const verticalSpaceOptions = [
      { label: __('None'), value: '' },
      { label: __('XSmall'), value: 'xsmall' },
      { label: __('Small'), value: 'small' },
      { label: __('Medium'), value: 'medium' },
      { label: __('Large'), value: 'large' },
      { label: __('XLarge'), value: 'xlarge' },
      { label: __('XXLarge'), value: 'xxlarge' },
    ];

    const classes = [className];
    if (paddingTop) {
      classes.push(`padding-top-${paddingTop}`);
    }
    if (paddingBottom) {
      classes.push(`padding-bottom-${paddingBottom}`);
    }
    if (marginTop) {
      classes.push(`margin-top-${marginTop}`);
    }
    if (marginBottom) {
      classes.push(`margin-bottom-${marginBottom}`);
    }
    if (height) {
      classes.push(`height-${height}`);
    }

    const ALLOWED_BLOCKS = [
      'cloudblocks/section-layout-inner-one-column',
      'cloudblocks/section-layout-inner-two-columns',
    ];

    const TEMPLATE = [
      [
        'cloudblocks/section-layout-inner-one-column',
        {},
        [['cloudblocks/section-layout-cell']],
      ],
    ];

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')}>
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
        </div>

        <BlockControls>
          <Toolbar>
            <IconButton
              label={__('Wide width')}
              icon="align-wide"
              className={`components-toolbar__control`}
              onClick={() => setAttributes({ width: 'width-wide' })}
            />
          </Toolbar>
        </BlockControls>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={__('Vertical Height')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="padding-top">Padding Top</label>
              <SelectControl
                id="padding-top"
                value={paddingTop}
                options={verticalSpaceOptions}
                onChange={paddingTop => {
                  setAttributes({ paddingTop });
                }}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="padding-bottom">Padding Bottom</label>
              <SelectControl
                id="padding-bottom"
                value={paddingBottom}
                options={verticalSpaceOptions}
                onChange={paddingBottom => {
                  setAttributes({ paddingBottom });
                }}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="margin-top">Margin Top</label>
              <SelectControl
                id="margin-top"
                value={marginTop}
                options={verticalSpaceOptions}
                onChange={marginTop => {
                  setAttributes({ marginTop });
                }}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="margin-bottom">Margin Bottom</label>
              <SelectControl
                id="margin-bottom"
                value={marginBottom}
                options={verticalSpaceOptions}
                onChange={marginBottom => {
                  setAttributes({ marginBottom });
                }}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="height">Height</label>
              <SelectControl
                id="height"
                value={height}
                options={[
                  { label: 'Auto', value: '' },
                  { label: 'One Third', value: 'one-third' },
                  { label: 'Half', value: 'half' },
                  { label: 'Two third', value: 'two-third' },
                  { label: 'Full', value: 'full' },
                ]}
                onChange={height => {
                  setAttributes({ height });
                }}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const {
      // width,
      // backgroundImageUrl,
      // backgroundImagePosition,
      // backgroundImageSize,
      // overlayColor,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      height,
    } = attributes;

    const classes = [className];
    if (paddingTop) {
      classes.push(`padding-top-${paddingTop}`);
    }
    if (paddingBottom) {
      classes.push(`padding-bottom-${paddingBottom}`);
    }
    if (marginTop) {
      classes.push(`margin-top-${marginTop}`);
    }
    if (marginBottom) {
      classes.push(`margin-top-${marginBottom}`);
    }
    if (height) {
      classes.push(`height-${height}`);
    }

    return (
      <div className={classes.join(' ')}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
