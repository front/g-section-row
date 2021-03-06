/**
 * External dependencies
 */
import React from 'react';
import { element, i18n, components, blockEditor } from 'wp';

/**
 * Internal dependencies
 */
import { getImageUrl } from '../helpers.js';

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
  RangeControl,
  ToggleControl,
  ToolbarButton,
} = components;

const {
  InspectorControls,
  InnerBlocks,
  PanelColorSettings,
  BlockControls,
  MediaUpload,
} = blockEditor;

const ALLOWED_MEDIA_TYPES = ['video', 'image'];
const IMAGE_BACKGROUND_TYPE = 'image';
const VIDEO_BACKGROUND_TYPE = 'video';

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
  justifyContent: {
    type: 'string',
    default: 'center',
  },
  htmlElement: {
    type: 'string',
    default: 'div',
  },
  behindPageHeader: {
    type: 'bool',
    default: false,
  },
  skipLink: {
    type: 'bool',
    default: false,
  },
  backgroundType: {
    type: 'string',
  },
};

const BackgroundImage = ({ style }) => (
  <div className="background-image" style={style} />
);

const BackgroundColor = ({ style }) => (
  <div className="background-color" style={style} />
);

const BackgroundVideo = ({ backgroundImage }) => (
  <div className="background-video">
    <video
      autoPlay
      loop
      muted
      playsinline
    >
      <source src={backgroundImage}></source>
    </video>
  </div>
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

  edit ({ attributes, className, setAttributes }) {
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
      htmlElement,
      justifyContent,
      backgroundType,
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
      { label: __('Auto'), value: '' },
      { label: __('One Third'), value: 'one-third' },
      { label: __('Half'), value: 'half' },
      { label: __('Two third'), value: 'two-third' },
      { label: __('Full'), value: 'full' },
    ];

    const widthOptions = [
      { label: __('Default'), value: '' },
      { label: __('Wide'), value: 'wide' },
      { label: __('Full width'), value: 'full' },
    ];

    const bgPositionOptions = [
      { label: __('None'), value: '' },
      { label: __('Center'), value: 'center' },
      { label: __('Center Top'), value: 'center top' },
      { label: __('Center Bottom'), value: 'center bottom' },
      { label: __('Left Center'), value: 'left center' },
      { label: __('Right Center'), value: 'right center' },
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
    if (justifyContent) {
      classes.push(`justify-content-${justifyContent}`);
    }

    const backgroundImgStyle = {};
    if (backgroundPosition) {
      backgroundImgStyle.backgroundPosition = backgroundPosition;
    }
    if (backgroundSize) {
      backgroundImgStyle.backgroundSize = backgroundSize;
    }
    if (backgroundType !== VIDEO_BACKGROUND_TYPE && backgroundImage) {
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

    const onSelectMedia = media => {
      if (!media || !media.url) {
        setAttributes({
          backgroundImage: undefined,
          backgroundImageId: undefined,
          backgroundType: undefined,
        });
        return;
      }

      let mediaType;
      if (media.media_type) {
        if (media.media_type === IMAGE_BACKGROUND_TYPE) {
          mediaType = IMAGE_BACKGROUND_TYPE;
        }
        else {
          // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
          // Videos contain the media type of 'file' in the object returned from the rest api.
          mediaType = VIDEO_BACKGROUND_TYPE;
        }
      }
      else {
        // for media selections originated from existing files in the media library.
        if (media.type !== IMAGE_BACKGROUND_TYPE && media.type !== VIDEO_BACKGROUND_TYPE) {
          return;
        }
        mediaType = media.type;
      }

      setAttributes({
        backgroundImage: getImageUrl(media, 'large'),
        backgroundImageId: media.id,
        backgroundType: mediaType,
      });
    };

    const onRemoveMedia = () => {
      setAttributes({
        backgroundImageId: null,
        backgroundImage: null,
        backgroundType: null,
      });
    };

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')}>
          {backgroundType === VIDEO_BACKGROUND_TYPE && backgroundImage && <BackgroundVideo backgroundImage={backgroundImage} />}
          {backgroundType !== VIDEO_BACKGROUND_TYPE && backgroundImage && <BackgroundImage style={backgroundImgStyle} />}
          {backgroundColor && <BackgroundColor style={backgroundColorStyle} />}
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
              onSelect={onSelectMedia}
              render={({ open }) => (
                <IconButton
                  className="components-toolbar__control"
                  label={__('Add/Edit background')}
                  icon="format-image"
                  onClick={open}
                />
              )}
              allowedTypes={ ALLOWED_MEDIA_TYPES }
            />
            {backgroundImageId && (
              <ToolbarButton
                title={__('Remove background')}
                icon="trash"
                onClick={onRemoveMedia}
              />
            )}
          </Toolbar>
        </BlockControls>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody>
            <PanelRow>
              <label htmlFor="element">{__('Html element')}</label>
              <SelectControl
                id="element"
                value={htmlElement}
                options={[
                  { label: 'Div', value: 'div' },
                  { label: 'Section', value: 'section' },
                ]}
                onChange={value => setAttributes({ htmlElement: value })}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title={__('Width and Height')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="width">{__('Width')}</label>
              <SelectControl
                id="width"
                value={width}
                options={widthOptions}
                onChange={value => setAttributes({ width: value })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="height">{__('Height')}</label>
              <SelectControl
                id="height"
                value={height}
                options={heightOptions}
                onChange={value => setAttributes({ height: value })}
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
                onChange: value => {
                  setAttributes({ backgroundColor: value });
                },
                label: __('Background Color'),
              },
            ]}
          />
          <PanelBody title={__('Background Image Settings')} initialOpen={false}>
            <RangeControl
              label={__('Background color opacity')}
              value={backgroundColorOpacity}
              onChange={value =>
                setAttributes({ backgroundColorOpacity: value })
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
                onChange={value =>
                  setAttributes({ backgroundPosition: value })
                }
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="bg-size">{__('Background Size')}</label>
              <SelectControl
                id="bg-size"
                value={backgroundSize}
                options={bgSizeOptions}
                onChange={value => setAttributes({ backgroundSize: value })}
              />
            </PanelRow>
          </PanelBody>
          <PanelBody
            title={__('Vertical space & alignment')}
            initialOpen={false}
          >
            <PanelRow>
              <label htmlFor="margin-top">{__('Margin Top')}</label>
              <SelectControl
                id="margin-top"
                value={marginTop}
                options={spaceOptions}
                onChange={value => setAttributes({ marginTop: value })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="margin-bottom">{__('Margin Bottom')}</label>
              <SelectControl
                id="margin-bottom"
                value={marginBottom}
                options={spaceOptions}
                onChange={value => setAttributes({ marginBottom: value })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="padding-top">{__('Padding Top')}</label>
              <SelectControl
                id="padding-top"
                value={paddingTop}
                options={spaceOptions}
                onChange={value => setAttributes({ paddingTop: value })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="padding-bottom">{__('Padding Bottom')}</label>
              <SelectControl
                id="padding-bottom"
                value={paddingBottom}
                options={spaceOptions}
                onChange={value => setAttributes({ paddingBottom: value })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="valign-content">
                {__('Vertical Align Content')}
              </label>
              <SelectControl
                id="valign-content"
                value={justifyContent}
                options={[
                  { label: __('Top'), value: 'flex-start' },
                  { label: __('Center'), value: 'center' },
                  { label: __('Bottom'), value: 'flex-end' },
                ]}
                onChange={value => setAttributes({ justifyContent: value })}
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
      htmlElement: HtmlElement,
      justifyContent,
      backgroundType,
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
    if (justifyContent) {
      classes.push(`justify-content-${justifyContent}`);
    }

    const backgroundImgStyle = {};
    if (backgroundPosition) {
      backgroundImgStyle.backgroundPosition = backgroundPosition;
    }
    if (backgroundSize) {
      backgroundImgStyle.backgroundSize = backgroundSize;
    }
    if (backgroundType !== VIDEO_BACKGROUND_TYPE && backgroundImage) {
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
      <HtmlElement className={classes.join(' ')}>
        {backgroundType === VIDEO_BACKGROUND_TYPE && backgroundImage && <BackgroundVideo backgroundImage={backgroundImage} />}
        {backgroundType !== VIDEO_BACKGROUND_TYPE && backgroundImage && <BackgroundImage style={backgroundImgStyle} />}
        {backgroundColor && <BackgroundColor style={backgroundColorStyle} />}
        <InnerBlocks.Content />
        {skipLink && (
          <div className="container js-smooth-scroll">
            <a className="skip-link screen-reader-text" href="">
              {__('Scroll down')}
            </a>
          </div>
        )}
      </HtmlElement>
    );
  },
};
