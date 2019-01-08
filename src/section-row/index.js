/**
 * External dependencies
 */
import React from 'react';
import { element, i18n, components, editor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

const { Fragment } = element;
const { __ } = i18n;

// TODO: Chooose components for the sidebar settings
const {
  PanelBody,
  PanelRow,
  SelectControl,
  Toolbar,
  IconButton,
  Button,
  RangeControl,
  ToggleControl,
} = components;

const {
  InspectorControls,
  InnerBlocks,
  PanelColorSettings,
  BlockControls,
  MediaUpload,
} = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  width: {
    type: 'string',
    default: 'full',
  },
  backgroundImage: {
    type: 'string',
  },
  backgroundImageId: {
    type: 'number',
  },
  backgroundPosition: {
    type: 'string',
    default: 'center',
  },
  backgroundSize: {
    type: 'string',
    default: 'cover',
  },
  backgroundColor: {
    type: 'string',
  },
  backgroundColorOpacity: {
    type: 'number',
    default: 10,
  },
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
  // htmlElement: {
  //   type: 'string',
  //   default: 'div',
  // },
  behindPageHeader: {
    type: 'bool',
    default: false,
  },
  skipLink: {
    type: 'bool',
    default: false,
  },
};

const BackgroundImage = ({ style }) => (
  <div className="background-image" style={style} />
);

const BackgroundColor = ({ style }) => (
  <div className="background-color" style={style} />
);

const ALLOWED_BLOCKS = [
  'cloudblocks/section-row-inner-one-column',
  'cloudblocks/section-row-inner-two-columns',
  'cloudblocks/section-row-inner-gallery',
];

const TEMPLATE = [
  [
    'cloudblocks/section-row-inner-one-column',
    [['cloudblocks/section-row-cell']],
  ],
];

export const name = 'section-row';

export const settings = {
  title: __('Section Row'),
  description: __(
    'Section row used as wrapper for inner-one-column, inner-two-column and inner-gallery blocks'
  ),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,
  supports: {
    html: false,
  },

  // Enable wide and full with in editor
  getEditWrapperProps (attributes) {
    const { width } = attributes;
    return { 'data-align': width };
  },

  edit ({ attributes, className, setAttributes, isSelected }) {
    const {
      width,
      backgroundImage,
      backgroundImageId,
      backgroundPosition,
      backgroundSize,
      backgroundColor,
      backgroundColorOpacity,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      height,
      behindPageHeader,
      skipLink,
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
      { label: __('Default'), value: '' },
      { label: __('Wide'), value: 'wide' },
      { label: __('Full width'), value: 'full' },
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
      classes.push(`align${width}`);
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
    if (behindPageHeader && height) {
      classes.push('behind-page-header');
    }

    const backgroundImgStyle = {};
    if (backgroundPosition) {
      backgroundImgStyle.backgroundPosition = backgroundPosition;
    }
    if (backgroundSize) {
      backgroundImgStyle.backgroundSize = backgroundSize;
    }
    if (backgroundImage) {
      backgroundImgStyle.backgroundImage = `url(${backgroundImage})`;
    }

    const backgroundColorStyle = {};
    if (backgroundColor) {
      backgroundColorStyle.backgroundColor = backgroundColor;
    }
    if (backgroundColorOpacity) {
      backgroundColorStyle.opacity = `${(backgroundColorOpacity * 0.1).toFixed(
        1
      )}`;
    }

    const onSelectBgImage = ({ url, id }) =>
      setAttributes({ backgroundImage: url, backgroundImageId: id });

    const onRemoveImage = () => {
      setAttributes({
        backgroundImageId: null,
        backgroundImage: null,
      });
    };

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')}>
          {backgroundImage && <BackgroundImage style={backgroundImgStyle} />}
          {backgroundColor && <BackgroundColor style={backgroundColorStyle} />}
          {backgroundImageId && isSelected && (
            <Button
              className="button"
              style={{ position: 'relative' }}
              onClick={onRemoveImage}
              children={__('Remove background image')}
            />
          )}
          <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
          {skipLink && (
            <div className="container js-smooth-scroll">
              <a className="skip-link screen-reader-text" href="">
                {__('Scroll down')}
              </a>
            </div>
          )}
        </div>

        <BlockControls>
          <Toolbar>
            <MediaUpload
              type="image"
              onSelect={onSelectBgImage}
              value={backgroundImageId}
              render={({ open }) => (
                <IconButton
                  className="components-toolbar__control"
                  label={__('Background image')}
                  icon="edit"
                  onClick={open}
                />
              )}
            />
          </Toolbar>
        </BlockControls>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={__('Width and Height')} initialOpen={false}>
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
            {height && (
              <PanelRow>
                <ToggleControl
                  label={__('Behind Page Header')}
                  checked={behindPageHeader}
                  onChange={() =>
                    setAttributes({ behindPageHeader: !behindPageHeader })
                  }
                />
              </PanelRow>
            )}
            <PanelRow>
              <ToggleControl
                label={__('Skip link')}
                checked={skipLink}
                onChange={() => setAttributes({ skipLink: !skipLink })}
              />
            </PanelRow>
          </PanelBody>
          <PanelColorSettings
            initialOpen={false}
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
            <RangeControl
              label={__('Background color opacity')}
              value={backgroundColorOpacity}
              onChange={backgroundColorOpacity =>
                setAttributes({ backgroundColorOpacity })
              }
              min={1}
              max={10}
            />
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
      backgroundImage,
      backgroundPosition,
      backgroundSize,
      backgroundColor,
      backgroundColorOpacity,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      height,
      behindPageHeader,
      skipLink,
    } = attributes;

    const classes = [className];
    if (width) {
      classes.push(`align${width}`);
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
    if (behindPageHeader && height) {
      classes.push('behind-page-header');
    }

    const backgroundImgStyle = {};
    if (backgroundPosition) {
      backgroundImgStyle.backgroundPosition = backgroundPosition;
    }
    if (backgroundSize) {
      backgroundImgStyle.backgroundSize = backgroundSize;
    }
    if (backgroundImage) {
      backgroundImgStyle.backgroundImage = `url(${backgroundImage})`;
    }

    const backgroundColorStyle = {};
    if (backgroundColor) {
      backgroundColorStyle.backgroundColor = backgroundColor;
    }
    if (backgroundColorOpacity) {
      backgroundColorStyle.opacity = `${(backgroundColorOpacity * 0.1).toFixed(
        1
      )}`;
    }

    return (
      <div className={classes.join(' ')}>
        {backgroundImage && <BackgroundImage style={backgroundImgStyle} />}
        {backgroundColor && <BackgroundColor style={backgroundColorStyle} />}
        <InnerBlocks.Content />
        {skipLink && (
          <div className="container js-smooth-scroll">
            <a className="skip-link screen-reader-text" href="">
              {__('Scroll down')}
            </a>
          </div>
        )}
      </div>
    );
  },
};
