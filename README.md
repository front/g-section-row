# Section Row

A collection of blocks that compose together to create flexible sections. The structure of the blocks are as follows:

- Section Row
  -- Row Inner One Column
  --- Section Cell
  -- Row Inner Two Columns
  --- Section Cell
  --- Section Cell
  -- Row Inner Gallery
  --- Section Cell
  --- Section Cell
  --- Section Cell

## Section Row Block

Section row is the root block where we can add on or more of the following blocks in any order.

- Row Inner One Column
- Row Inner Two Columns
- Row Inner Gallery

### Settings

- Widht
- Height
- Background image
- Backgrouind color
- Top and bottom padding
- Top and bottom margin

## Row Inner One Column Block

Row inner one column can be put inside Section Row, and has a Row Cell child block.

### Settings

- Widht
- Height
- Tob and bottom margin [xsmall, small, medium, large, xlarge, xxlarge]
- Top and bottom padding (will be removed)

## Row Inner Two Column Block

Row inner two columns can be put inside Section Row, and has two Row Cell child blocks.

### Settings

- Widht
- Height
- Split [One to One, One to Two, Two to One, One to Three, Three to One, One to Four, Four to One]
- Column gap [xsmall, small, medium, large, xlarge, xxlarge]
- Invert
- Tob and bottom margin [xsmall, small, medium, large, xlarge, xxlarge]
- Top and bottom padding (will be removed)

## Row Inner Gallery Block

Row inner gallery columns can be put inside Section Row, and has two or more Row Cell child blocks.

### Settings

- Widht
- Height
- Columns 1-10
- Gallery items 2-40
- Column gap [xsmall, small, medium, large, xlarge, xxlarge]
- Row gap [xsmall, small, medium, large, xlarge, xxlarge]
- Tob and bottom margin [xsmall, small, medium, large, xlarge, xxlarge]
- Top and bottom padding (will be removed)

## Row cell

Row cell is child block of any Row Inner block, and any block can be put inside it.

### Settings

- Max width
- Align self [None, Auto, Center, Flex-start, Flex-end, Baseline]
- Justify self [None, Auto, Center, Flex-start, Flex-end, Baseline]
- Align items [None, Auto, Center, Flex-start, Flex-end, Baseline]
- Justify content [None, Auto, Center, Flex-start, Flex-end, Baseline, Space-between, Space-around, Space-evenly]

## Intallation

> This project was bootstrapped with [Create Cloud Block](https://github.com/front/create-cloud-block).

Below you will find some information on how to run scripts.

### `npm start`

- Use to compile and run the block in development mode.
- Live reload is not supported currently.

### `npm run build`

- Use to build production code for your block inside `build` folder.

### `npm run deploy`

- Use to publish the block to NPM
- It will become available in Gutenberg Cloud in a few minutes
