# Act 4 Template

These templates come from [Act 4: World Gen, Loot Tables & Recipes](../../03-activities/04-world-gen-loot-tables-recipes.md). Act 4 completes the ore system by adding mining drops, tool requirements, smelting recipes, and underground generation.

Replace every value inside angle brackets, such as `<mod-id>`, with the matching value from your project. Minecraft 1.21.1 uses the singular data-directory names `loot_table` and `recipe`.

## Project Information

Record these values first because the same identifiers must match across Java, loot tables, recipes, tags, and world-generation files.

```text
Mod ID: <mod-id>
Entry-Point Class: <EntryPointClass>
Stone Ore Path: <stone_ore_path>
Deepslate Ore Path: <deepslate_ore_path>
Raw Ore Item Path: <raw_ore_path>
Ingot or Gem Path: <ingot_path>
Food Item Path: <food_path>
Ore Feature Path: <ore_feature_path>
Ore Feature Variable: <ORE_FEATURE_VAR_NAME>
```

## Data Directory Structure

This structure shows where the Act 4 server-side data files belong.

```text
src/main/resources/data/
├── <mod-id>/
│   ├── loot_table/blocks/
│   │   ├── <stone_ore_path>.json
│   │   └── <deepslate_ore_path>.json
│   ├── recipe/
│   │   ├── <ingot_path>_from_smelting_<raw_ore_path>.json
│   │   └── <food_path>_from_smelting_<ingot_path>.json
│   └── worldgen/
│       ├── configured_feature/<ore_feature_path>.json
│       └── placed_feature/<ore_feature_path>.json
└── minecraft/tags/block/
    ├── mineable/pickaxe.json
    └── needs_iron_tool.json
```

## Ore Loot Tables

Create one loot table for each ore at `data/<mod-id>/loot_table/blocks/<block_path>.json`.

### Minimal block loot table

This outer structure declares a block loot table. An empty `pools` array produces no drops.

```json
{
  "type": "minecraft:block",
  "pools": []
}
```

### Basic raw-ore drop

This pool rolls once and drops the registered raw ore item.

```json
{
  "type": "minecraft:block",
  "pools": [
    {
      "rolls": 1.0,
      "bonus_rolls": 0.0,
      "entries": [
        {
          "type": "minecraft:item",
          "name": "<mod-id>:<raw_ore_path>"
        }
      ]
    }
  ]
}
```

### Silk Touch alternative

An alternatives entry checks its children in order. A tool with Silk Touch drops the ore block; otherwise, Minecraft selects the raw ore entry.

```json
{
  "type": "minecraft:alternatives",
  "children": [
    {
      "type": "minecraft:item",
      "conditions": [
        {
          "condition": "minecraft:match_tool",
          "predicate": {
            "predicates": {
              "minecraft:enchantments": [
                {
                  "enchantments": "minecraft:silk_touch",
                  "levels": {
                    "min": 1
                  }
                }
              ]
            }
          }
        }
      ],
      "name": "<mod-id>:<ore_block_path>"
    },
    {
      "type": "minecraft:item",
      "name": "<mod-id>:<raw_ore_path>"
    }
  ]
}
```

### Fortune and explosion functions

Attach these functions to the raw ore entry. `apply_bonus` uses Fortune's normal ore-drop formula, and `explosion_decay` allows explosions to destroy part of the resulting stack.

```json
{
  "type": "minecraft:item",
  "functions": [
    {
      "function": "minecraft:apply_bonus",
      "enchantment": "minecraft:fortune",
      "formula": "minecraft:ore_drops"
    },
    {
      "function": "minecraft:explosion_decay"
    }
  ],
  "name": "<mod-id>:<raw_ore_path>"
}
```

### Complete ore loot table

This complete template combines Silk Touch, Fortune, and explosion behavior. Use the stone ore path for the stone file and the deepslate ore path for the deepslate file; both should use the same raw ore item path.

```json
{
  "type": "minecraft:block",
  "random_sequence": "<mod-id>:blocks/<ore_block_path>",
  "pools": [
    {
      "bonus_rolls": 0.0,
      "entries": [
        {
          "type": "minecraft:alternatives",
          "children": [
            {
              "type": "minecraft:item",
              "conditions": [
                {
                  "condition": "minecraft:match_tool",
                  "predicate": {
                    "predicates": {
                      "minecraft:enchantments": [
                        {
                          "enchantments": "minecraft:silk_touch",
                          "levels": {
                            "min": 1
                          }
                        }
                      ]
                    }
                  }
                }
              ],
              "name": "<mod-id>:<ore_block_path>"
            },
            {
              "type": "minecraft:item",
              "functions": [
                {
                  "function": "minecraft:apply_bonus",
                  "enchantment": "minecraft:fortune",
                  "formula": "minecraft:ore_drops"
                },
                {
                  "function": "minecraft:explosion_decay"
                }
              ],
              "name": "<mod-id>:<raw_ore_path>"
            }
          ]
        }
      ],
      "rolls": 1.0
    }
  ]
}
```

The optional `random_sequence` names the loot table's random source; it is not a file path.

### Optional random bonus pool

Add this as another object in the root `pools` array to give an additional item a 10% drop chance. It is an experiment and is not required for the ore system.

```json
{
  "rolls": 1.0,
  "bonus_rolls": 0.0,
  "entries": [
    {
      "type": "minecraft:item",
      "conditions": [
        {
          "condition": "minecraft:random_chance",
          "chance": 0.1
        }
      ],
      "name": "<bonus_item_id>"
    }
  ]
}
```

## Mining Tags

### Pickaxe tag

Create `data/minecraft/tags/block/mineable/pickaxe.json`. This adds both custom ores to Minecraft's pickaxe-mineable block tag without replacing its existing entries.

```json
{
  "replace": false,
  "values": [
    "<mod-id>:<stone_ore_path>",
    "<mod-id>:<deepslate_ore_path>"
  ]
}
```

### Required tool-level tag

Create `data/minecraft/tags/block/needs_iron_tool.json` with the same contents to require an iron-tier or better tool for drops.

```json
{
  "replace": false,
  "values": [
    "<mod-id>:<stone_ore_path>",
    "<mod-id>:<deepslate_ore_path>"
  ]
}
```

Use `needs_stone_tool.json` or `needs_diamond_tool.json` instead if the ore requires a different mining tier.

## Smelting Recipes

### Raw ore to ingot or gem

Create `data/<mod-id>/recipe/<ingot_path>_from_smelting_<raw_ore_path>.json`. This furnace recipe turns the raw ore into an ingot or gem, awards experience, and optionally produces a chosen count.

```json
{
  "type": "minecraft:smelting",
  "category": "misc",
  "cookingtime": <int_ticks>,
  "experience": <decimal_experience>,
  "ingredient": {
    "item": "<mod-id>:<raw_ore_path>"
  },
  "result": {
    "id": "<mod-id>:<ingot_path>",
    "count": <int_count>
  }
}
```

Minecraft normally runs at 20 ticks per second, so a `cookingtime` of `200` is approximately 10 seconds.

### Ingot or gem to food

Create `data/<mod-id>/recipe/<food_path>_from_smelting_<ingot_path>.json`. This second furnace recipe completes the Act 4 smelting chain.

```json
{
  "type": "minecraft:smelting",
  "category": "food",
  "cookingtime": 200,
  "experience": 0.35,
  "ingredient": {
    "item": "<mod-id>:<ingot_path>"
  },
  "result": {
    "id": "<mod-id>:<food_path>",
    "count": <int_count>
  }
}
```

For an optional Blast Furnace version of the first recipe, copy it into a uniquely named file and change its type to `minecraft:blasting`.

## Configured Ore Feature

Create `data/<mod-id>/worldgen/configured_feature/<ore_feature_path>.json`. This defines the vein size and chooses the stone or deepslate ore according to the terrain being replaced.

```json
{
  "type": "minecraft:ore",
  "config": {
    "discard_chance_on_air_exposure": 0.0,
    "size": 9,
    "targets": [
      {
        "state": {
          "Name": "<mod-id>:<stone_ore_path>"
        },
        "target": {
          "predicate_type": "minecraft:tag_match",
          "tag": "minecraft:stone_ore_replaceables"
        }
      },
      {
        "state": {
          "Name": "<mod-id>:<deepslate_ore_path>"
        },
        "target": {
          "predicate_type": "minecraft:tag_match",
          "tag": "minecraft:deepslate_ore_replaceables"
        }
      }
    ]
  }
}
```

`size` controls the attempted vein size. `discard_chance_on_air_exposure` ranges from `0.0` to `1.0`, with `0.0` allowing exposed ore to remain on cave walls.

## Placed Ore Feature

Create `data/<mod-id>/worldgen/placed_feature/<ore_feature_path>.json`. It references the configured feature and controls attempts per chunk, horizontal spread, height range, and biome-aware placement.

```json
{
  "feature": "<mod-id>:<ore_feature_path>",
  "placement": [
    {
      "type": "minecraft:count",
      "count": 10
    },
    {
      "type": "minecraft:in_square"
    },
    {
      "type": "minecraft:height_range",
      "height": {
        "type": "minecraft:trapezoid",
        "max_inclusive": {
          "absolute": 56
        },
        "min_inclusive": {
          "absolute": -24
        }
      }
    },
    {
      "type": "minecraft:biome"
    }
  ]
}
```

Change `count`, the height range, and the configured feature's `size` to tune ore rarity and vein size.

## `ModWorldGeneration.java`

Create this organizer class at `src/main/java/<your_modpackagename>/ModWorldGeneration.java`. It creates a registry key for the placed feature and adds that feature to Overworld biomes during underground ore generation.

```java
package <your_modpackagename>;

import net.fabricmc.fabric.api.biome.v1.BiomeModifications;
import net.fabricmc.fabric.api.biome.v1.BiomeSelectors;
import net.minecraft.registry.RegistryKey;
import net.minecraft.registry.RegistryKeys;
import net.minecraft.world.gen.GenerationStep;
import net.minecraft.world.gen.feature.PlacedFeature;

public class ModWorldGeneration {

    public static final RegistryKey<PlacedFeature> <ORE_FEATURE_VAR_NAME> = RegistryKey.of(
            RegistryKeys.PLACED_FEATURE,
            <EntryPointClass>.id("<ore_feature_path>")
    );

    public static void initialize() {
        BiomeModifications.addFeature(
                BiomeSelectors.foundInOverworld(),
                GenerationStep.Feature.UNDERGROUND_ORES,
                <ORE_FEATURE_VAR_NAME>
        );
    }
}
```

The feature path in Java must exactly match both world-generation JSON filenames.

## Load World Generation

Add the new initializer call to the entry-point class. This activates the biome modification when Fabric initializes the mod.

```java
@Override
public void onInitialize() {
    ModItems.initialize();
    ModBlocks.initialize();
    ModWorldGeneration.initialize();

    LOGGER.info("Hello Fabric world!");
}
```

## Build and Test Commands

Build after each major section to catch malformed JSON, missing resources, or Java compilation errors.

```text
./gradlew build
```

Run the development client to test mining drops, recipes, and generation.

```text
./gradlew runClient
```

World generation only occurs in newly generated chunks. This command directly tests the placed feature near the selected coordinates in a cheats-enabled world:

```text
/place feature <mod-id>:<ore_feature_path> <x> <y> <z>
```

Use Survival mode to test mining requirements and Spectator mode to inspect underground generation.

```text
/gamemode survival
/gamemode spectator
```
