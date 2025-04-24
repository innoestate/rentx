## What is ui-table?

The `ui-table` is a dynamic table component designed to isolate all ui logic (using whatever library or custom components) and display data in a structured and adaptable format. It automatically aligns rows to columns based on matching keys, making it easy to manage and display data efficiently.

## How to Use ui-table

To use the `ui-table`, you need to define the columns and rows. The columns are specified with at least keys and labels, allowing also options like editable or dropdowns, while the rows should contain objects with keys that match the columns.

### Columns Definition

A UiTableColumn need:
- a key: a string to match with rows 
- a label: a string to display in the column cells

as optionnal:
- sort: a number to define the sorting priority by alphabetic order or conversely. If not specified, the column will not be sorted 
- editable: true if the column is editable for string, number 
- dropDownItems: an array of dropdown items. If defined, each cell of this column will be a dropdown containing the list of items

### Rows Definition

Rows are defined as an array of objects containing CellTypes, where each object represents a row in the table. 
Each value in the row will be display if its key matches a column key.
The value can be a string, a number, a UiItem (that can display icon), or a UiDropdownItem
The UiTable will adapt each cell depending of the type of value.


### Example

Here's a simple example demonstrating how to define columns and rows for the `ui-table`:

```javascript
const columns = [
  { key: 'field1', label: 'Field 1' },
  { key: 'field2', label: 'Field 2' }
];

const rows = [
  { field1: 'any value', field2: 'any value for field2'},
  { field1: 'other value' },
  { field2: 'value in third row' }
];


// The table will display:
// | Field 1      | Field 2               |
// |--------------|-----------------------|
// | any value    | any value for field2  |
// | other value  |                       |
// |              | value in third row    |

```

In this example, the `ui-table` will display a 2 columns table, labeled "Field 1" and "Field 2", with two rows showing "any value" and "other value".
