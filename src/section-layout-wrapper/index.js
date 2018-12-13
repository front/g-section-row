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
  SelectControl /* IconButton, Toolbar*/,
} = components;

const {
  InspectorControls,
  InnerBlocks,
  PanelColorSettings /* BlockControls*/,
} = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  width: {
    type: 'string',
  },
  // backgroundUrl: {
  //   type: 'string',
  // },
  backgroundImagePosition: {
    type: 'string',
    // default: 'center center',
  },
  backgroundImageSize: {
    type: 'string',
    default: 'cover',
  },
  backgroundColor: {
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
  },
  // scrollBtn: {
  //   type: 'bool',
  //   default: false,
  // },
};

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
      width,
      // backgroundUrl,
      backgroundPosition,
      backgroundSize,
      backgroundColor,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      height,
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

    const heightOptions = [
      { label: 'Auto', value: '' },
      { label: 'One Third', value: 'one-third' },
      { label: 'Half', value: 'half' },
      { label: 'Two third', value: 'two-third' },
      { label: 'Full', value: 'full' },
    ];

    const widthOptions = [
      { label: 'Default', value: '' },
      { label: 'Wide', value: 'width-wide' },
      { label: 'Full Width', value: 'width-full' },
    ];

    const bgPositionOptions = [
      { label: 'None', value: '' },
      { label: 'Center', value: 'center' },
      { label: 'Center Top', value: 'center top' },
      { label: 'Center Bottom', value: 'center bottom' },
      { label: 'Left Center', value: 'left center' },
      { label: 'Right Center', value: 'right center' },
    ];

    const bgSizeOptions = [
      { label: __('None'), value: '' },
      { label: __('Cover'), value: 'cover' },
      { label: __('Contain'), value: 'contain' },
    ];

    const classes = [className];
    if (width) {
      classes.push(width);
    }
    if (height) {
      classes.push(`height-${height}`);
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

    const styles = {};
    if (backgroundColor) {
      styles.backgroundColor = backgroundColor;
    }
    if (backgroundPosition) {
      styles.backgroundPosition = backgroundPosition;
    }
    if (backgroundSize) {
      styles.backgroundSize = backgroundSize;
    }

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')} style={styles}>
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody>
            <PanelRow>
              <label htmlFor="width">{__('Width')}</label>
              <SelectControl
                id="width"
                value={width}
                options={widthOptions}
                onChange={width => setAttributes({ width })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="height">{__('Height')}</label>
              <SelectControl
                id="height"
                value={height}
                options={heightOptions}
                onChange={height => setAttributes({ height })}
              />
            </PanelRow>
          </PanelBody>
          <PanelColorSettings
            title={__('Background Color')}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: backgroundColor => {
                  setAttributes({ backgroundColor });
                },
                label: __('Background Color'),
              },
            ]}
          />
          <PanelBody title={__('Background Settings')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="bg-position">{__('Background Position')}</label>
              <SelectControl
                id="bg-position"
                value={backgroundPosition}
                options={bgPositionOptions}
                onChange={backgroundPosition =>
                  setAttributes({ backgroundPosition })
                }
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="bg-size">{__('Background Size')}</label>
              <SelectControl
                id="bg-size"
                value={backgroundSize}
                options={bgSizeOptions}
                onChange={backgroundSize => setAttributes({ backgroundSize })}
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
        </InspectorControls>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const {
      width,
      // backgroundImageUrl,
      backgroundPosition,
      backgroundSize,
      backgroundColor,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      height,
    } = attributes;

    const classes = [className];
    if (width) {
      classes.push(width);
    }
    if (height) {
      classes.push(`height-${height}`);
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

    const styles = {};
    if (backgroundColor) {
      styles.backgroundColor = backgroundColor;
    }
    if (backgroundPosition) {
      styles.backgroundPosition = backgroundPosition;
    }
    if (backgroundSize) {
      styles.backgroundSize = backgroundSize;
    }

    return (
      <div className={classes.join(' ')} style={styles}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
