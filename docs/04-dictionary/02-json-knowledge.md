# JSON Knowledge

> **JSON** (JavaScript Object Notation) is a text format for structured data. Minecraft uses JSON files for models, block states, recipes, tags, loot tables, translations, and other resources.

## JSON Object

A JSON **object** uses curly braces and contains `"key": "value"` pairs:

```json
{
    "parent": "minecraft:item/generated",
    "textures": {
        "layer0": "examplemod:item/ruby"
    }
}
```

In this example, `"parent"` is a key and `"minecraft:item/generated"` is its value. The value of `"textures"` is another JSON object.

## JSON Array

A JSON **array** uses square brackets to store an ordered list:

```json
{
    "values": [
        "mod-id:mod_item",
        "minecraft:diamond"
        ]
}
```

## JSON Value Types

| Type | Example | Minecraft example |
| --- | --- | --- |
| String (text) | `"ruby"` | An item ID such as `"examplemod:ruby"` |
| Number (whole number/integer) | `64` or `200` | Recipe `cookingtime`, which must use `200` rather than `200.0` |
| Number (decimal) | `3.5` or `0.7` | Recipe `experience`, such as `0.7` |
| Boolean | `true` or `false` | A setting that can be enabled or disabled |
| Object | `{ "key": "value" }` | A recipe's `result` object |
| Array | `["ruby", "diamond"]` | A tag's list of `values` |
| Empty value | `null` | An intentionally empty value, when supported |

JSON itself calls both `200` and `0.7` **numbers**. However, Minecraft gives each key an expected data type. If Minecraft expects a whole-number integer, such as for recipe `cookingtime`, write `200` without a decimal point. If the key accepts a decimal number, such as recipe `experience`, a value like `0.7` is valid.

## Syntax Rules

- Put double quotation marks around every key and string value.
- Separate a key from its value with a colon: `"key": "value"`.
- Separate entries with commas.
- Do not place a comma after the final entry in an object or array.
- Match every `{` with `}` and every `[` with `]`.
- Standard JSON does not allow comments.
- Filenames and folder paths must match what Minecraft expects, including
  capitalization.

This is invalid because it uses single quotes and has a trailing comma:

```text
{
  'item': 'examplemod:ruby',
}
```

## JSON vs JAVA

Java files contain program instructions and use the `.java` extension. JSON
files contain data and use the `.json` extension. JSON does not run methods or
create game logic; Minecraft or your mod reads the JSON and decides what to do
with its values.

If a JSON resource does not work, check the game log. A message about parsing
usually indicates invalid JSON syntax, while “file not found” often indicates
an incorrect identifier, filename, or folder.

---
To be updated.
