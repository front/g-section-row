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
const { PanelBody, PanelRow, SelectControl, TextControl } = components;
const { InspectorControls, InnerBlocks } = editor;

// TODO: Add here the editable block attributes
const BLOCK_ATTRIBUTES = {
  maxWidth: {
    type: 'string',
  },
  alignSelf: {
    type: 'string',
  },
  justifySelf: {
    type: 'string',
  },
  justifyContent: {
    type: 'string',
  },
  alignItems: {
    type: 'string',
  },
};

export const name = 'section-row-cell';

export const settings = {
  title: __('Cell'),
  description: __('Cell for use inside any Section Row Inner blocks'),
  icon: 'cover-image',
  attributes: BLOCK_ATTRIBUTES,
  supports: {
    inserter: false,
    html: false,
  },

  edit ({ attributes, className, setAttributes }) {
    const {
      maxWidth,
      alignSelf,
      alignItems,
      justifySelf,
      justifyContent,
    } = attributes;

    const styles = {};
    if (maxWidth) {
      styles.maxWidth = `${maxWidth}`;
    }
    if (alignSelf) {
      styles.alignSelf = alignSelf;
    }
    if (alignItems) {
      styles.alignItems = alignItems;
    }
    if (justifySelf) {
      styles.justifySelf = justifySelf;
    }
    if (justifyContent) {
      styles.justifyContent = justifyContent;
    }

    const positionOptions = [
      { label: __('None'), value: '' },
      { label: __('Auto'), value: 'auto' },
      { label: __('Center'), value: 'center' },
      { label: __('Flex Start'), value: 'flex-start' },
      { label: __('Flex End'), value: 'flex-end' },
      { label: __('Baseline'), value: 'baseline' },
    ];

    const distributeOptions = [
      ...positionOptions,
      { label: __('Space Between'), value: 'space-between' },
      { label: __('Space Around'), value: 'space-around' },
      { label: __('Space Evenly'), value: 'space-evenly' },
    ];

    return (
      <Fragment>
        {/* Block markup (main editor) */}
        <div
          className={['section-row-cell', className].join(' ')}
          style={styles}
        >
          <InnerBlocks templateLock={false} />
        </div>

        <InspectorControls>
          {/* Block settings (sidebar) */}
          <PanelRow>
            <TextControl
              label={__('Max Width')}
              help={__('Set max-width including unit of measure.')}
              value={maxWidth}
              onChange={maxWidth => setAttributes({ maxWidth })}
            />
          </PanelRow>
          <PanelBody title={__('Positioning')} initialOpen={false}>
            <PanelRow>
              <label htmlFor="align-self">Align Self</label>
              <SelectControl
                id="align-self"
                value={alignSelf}
                options={positionOptions}
                onChange={alignSelf => {
                  setAttributes({ alignSelf });
                }}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="justify-self">Justify Self</label>
              <SelectControl
                id="justify-self"
                value={justifySelf}
                options={positionOptions}
                onChange={justifySelf => {
                  setAttributes({ justifySelf });
                }}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="align-items">Align Items</label>
              <SelectControl
                id="align-items"
                value={alignItems}
                options={positionOptions}
                onChange={alignItems => {
                  setAttributes({ alignItems });
                }}
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="justify-content">Justify Content</label>
              <SelectControl
                id="justify-content"
                value={justifyContent}
                options={distributeOptions}
                onChange={justifyContent => {
                  setAttributes({ justifyContent });
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
      maxWidth,
      alignSelf,
      alignItems,
      justifySelf,
      justifyContent,
    } = attributes;

    const styles = {};
    if (maxWidth) {
      styles.maxWidth = `${maxWidth}`;
    }
    if (alignSelf) {
      styles.alignSelf = alignSelf;
    }
    if (alignItems) {
      styles.alignItems = alignItems;
    }
    if (justifySelf) {
      styles.justifySelf = justifySelf;
    }
    if (justifyContent) {
      styles.justifyContent = justifyContent;
    }

    return (
      <div className={['section-row-cell', className].join(' ')} style={styles}>
        <InnerBlocks.Content />
      </div>
    );
  },
};
