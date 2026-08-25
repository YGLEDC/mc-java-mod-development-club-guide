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

| Type | Example |
| --- | --- |
| String (text) | `"ruby"` |
| Number | `64` or `3.5` |
| Boolean | `true` or `false` |
| Object | `{ "key": "value" }` |
| Array | `["ruby", "diamond"]` |
| Empty value | `null` |

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
