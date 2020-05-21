# html-autocomplete



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                                                                                | Type                        | Default      |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------ |
| `direction`      | `direction`        | The direction (ltr or rlt).                                                                                                                                | `"ltr" \| "rtl"`            | `'ltr'`      |
| `idField`        | `id-field`         | The id field                                                                                                                                               | `string`                    | `'id'`       |
| `imagePathField` | `image-path-field` | The field that has the path of the image (image shows at the start of the item and can be an svg icon). If this field is filled, the image will be visible | `string`                    | `undefined`  |
| `labelField`     | `label-field`      | The label field                                                                                                                                            | `string`                    | `'name'`     |
| `mode`           | `mode`             | The mode of the input                                                                                                                                      | `"bootstrap" \| "material"` | `'material'` |
| `placeholder`    | `placeholder`      | The placeholder                                                                                                                                            | `string`                    | `undefined`  |
| `readonly`       | `readonly`         | ReadOnly attribute                                                                                                                                         | `boolean`                   | `false`      |
| `suggestions`    | --                 | Suggestions                                                                                                                                                | `any[]`                     | `[]`         |
| `value`          | `value`            | The value of the input                                                                                                                                     | `any`                       | `undefined`  |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `itemSelected` |             | `CustomEvent<any>` |


## Methods

### `setFocus() => Promise<void>`

Sets focus on the specified `ion-input`. Use this method instead of the global
`input.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
