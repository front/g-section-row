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

const {
  PanelBody,
  PanelRow,
  SelectControl,
  RangeControl,
  ToggleControl,
} = components;
const { InspectorControls, InnerBlocks } = editor;

const BLOCK_ATTRIBUTES = {
  width: {
    type: 'string',
    default: 'width-default',
  },
  columns: {
    type: 'number',
    default: 3,
  },
  galleryItems: {
    type: 'number',
    default: 3,
  },
  columnGap: {
    type: 'string',
    default: 'medium',
  },
  rowGap: {
    type: 'string',
    default: 'medium',
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
  fullHeight: {
    type: 'boolean',
    default: true,
  },
};

const ALLOWED_BLOCKS = ['cloudblocks/section-row-cell'];

function getTemplate (galleryItem) {
  const galleryItemBlocks = [];
  for (let i = 0; i < galleryItem; i++) {
    galleryItemBlocks.push(['cloudblocks/section-row-cell']);
  }
  return galleryItemBlocks;
}

export const name = 'section-row-inner-gallery';

export const settings = {
  title: __('Inner Gallery Row'),
  description: __('Grid row for use inside Section Row block'),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,
  supports: {
    html: false,
  },

  parent: ['cloudblocks/section-row'],

  edit ({ attributes, className, setAttributes }) {
    const {
      columns,
      galleryItems,
      columnGap,
      rowGap,
      marginTop,
      marginBottom,
      paddingTop,
      paddingBottom,
      width,
      fullHeight,
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
      { label: __('Default'), value: 'width-default' },
      { label: __('Wide'), value: 'width-wide' },
      { label: __('Full'), value: 'width-full' },
      {
        label: __('Full - No margin'),
        value: 'width-full-no-margin',
      },
    ];

    const classes = [className];
    if (width) {
      classes.push(width);
    }
    if (columns) {
      classes.push(`columns-${columns}`);
    }
    if (columnGap) {
      classes.push(`column-gap-${columnGap}`);
    }
    if (rowGap) {
      classes.push(`row-gap-${rowGap}`);
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
    if (fullHeight) {
      classes.push('full-height');
    }

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')}>
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={getTemplate(galleryItems)}
            templateLock="insert"
          />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody>
            <RangeControl
              label={__('Columns')}
              value={columns}
              onChange={columns => setAttributes({ columns })}
              min={1}
              max={10}
            />
            <RangeControl
              label={__('Gallery items')}
              value={galleryItems}
              onChange={galleryItems => setAttributes({ galleryItems })}
              min={2}
              max={40}
            />
            <PanelRow>
              <label htmlFor="column-gap">{__('Column gap')}</label>
              <SelectControl
                id="column-gap"
                value={columnGap}
                options={spaceOptions}
                onChange={columnGap => setAttributes({ columnGap })}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="row-gap">{__('Row gap')}</label>
              <SelectControl
                id="row-gap"
                value={rowGap}
                options={spaceOptions}
                onChange={rowGap => setAttributes({ rowGap })}
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
      columns,
      columnGap,
      rowGap,
      marginTop,
      marginBottom,
      paddingTop,
      paddingBottom,
      fullHeight,
    } = attributes;

    const classes = [className];
    if (width) {
      classes.push(width);
    }
    if (columns) {
      classes.push(`columns-${columns}`);
    }
    if (columnGap) {
      classes.push(`column-gap-${columnGap}`);
    }
    if (rowGap) {
      classes.push(`row-gap-${rowGap}`);
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
    if (fullHeight) {
      classes.push('full-height');
    }

    return (
      <div className={classes.join(' ')}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
