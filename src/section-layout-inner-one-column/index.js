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
};

export const name = 'section-layout-inner-one-column';

export const settings = {
  title: __('Section Layout Inner One column'),
  description: __('One column for use inside Section Layout Wrapper'),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,

  edit ({ attributes, className, setAttributes }) {
    const { width, fullHeight } = attributes;

    const classes = [className];
    if (width) {
      classes.push(width);
    }
    if (fullHeight) {
      classes.push('full-height');
    }

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div className={classes.join(' ')}>
          <InnerBlocks />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelBody title={__('Settings')} initialOpen={true}>
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
              {/* <label htmlFor="full-height">Full height</label> */}
              <ToggleControl
                // id="full-height"
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
    const { width, fullHeight } = attributes;

    const classes = [className];
    if (width) {
      classes.push(width);
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
