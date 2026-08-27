# Act 3 Template

These templates come from [Act 3: Block](../../03-activities/03-block.md). Act 3 builds on the Act 2 project by adding stone and deepslate ore blocks, their inventory items, and their visual resources.

Replace every value inside angle brackets, such as `<mod-id>`, with the matching value from your project.

## Block Information

Record these values before editing code or resources. The variable names are Java constants, while each block path becomes part of its Minecraft block ID and resource filenames.

```text
Stone Ore Variable Name: <STONE_ORE_BLOCK_NAME>
Stone Ore Path: <stone_ore_block_path>
Stone Ore ID: <mod-id>:<stone_ore_block_path>

Deepslate Ore Variable Name: <DEEPSLATE_ORE_BLOCK_NAME>
Deepslate Ore Path: <deepslate_ore_block_path>
Deepslate Ore ID: <mod-id>:<deepslate_ore_block_path>
```

## `ModBlocks.java`

This organizer class creates and registers blocks, registers a `BlockItem` for each block, and adds the blocks to the Creative inventory.

Create it at:

```text
src/main/java/<your_modpackagename>/ModBlocks.java
```

### Package and class declarations

The package declaration identifies the file's Java package, and the public class name must match `ModBlocks.java`.

```java
package <your_modpackagename>;

public class ModBlocks {

}
```

### Required imports

These imports provide Minecraft's block, block settings, block-item, registry, identifier, and Creative inventory APIs.

```java
import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.block.AbstractBlock;
import net.minecraft.block.Block;
import net.minecraft.block.Blocks;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.item.ItemGroups;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;
```

### Block registration method

This helper registers both parts of a block: the placeable `Block` in `Registries.BLOCK` and its inventory representation, the `BlockItem`, in `Registries.ITEM`. Both use the same identifier.

```java
private static Block register(String name, Block block) {
    Identifier id = <EntryPointClass>.id(name);

    Block registeredBlock = Registry.register(
            Registries.BLOCK,
            id,
            block
    );

    Registry.register(
            Registries.ITEM,
            id,
            new BlockItem(registeredBlock, new Item.Settings())
    );

    return registeredBlock;
}
```

### Block field

This field creates and registers a block. `AbstractBlock.Settings.copy(...)` copies properties such as hardness, resistance, and sound from an existing Minecraft block.

```java
public static final Block <BLOCK_VAR_NAME> = register(
        "<block_path>",
        new Block(AbstractBlock.Settings.copy(Blocks.<BLOCK_TO_COPY>))
);
```

For the stone ore, Act 3 copies `Blocks.IRON_ORE`. For the deepslate ore, use the matching deepslate block settings.

```java
public static final Block <STONE_ORE_BLOCK_NAME> = register(
        "<stone_ore_block_path>",
        new Block(AbstractBlock.Settings.copy(Blocks.IRON_ORE))
);

public static final Block <DEEPSLATE_ORE_BLOCK_NAME> = register(
        "<deepslate_ore_block_path>",
        new Block(AbstractBlock.Settings.copy(Blocks.DEEPSLATE_IRON_ORE))
);
```

### General Creative inventory initializer

This reusable form adds one or more registered blocks to a selected Creative inventory tab.

```java
public static void initialize() {
    ItemGroupEvents.modifyEntriesEvent(ItemGroups.<TAB>)
            .register(entries -> {
                entries.add(<BLOCK_VAR_NAME_1>);
                entries.add(<BLOCK_VAR_NAME_2>);
            });
}
```

### Natural inventory tab initializer

Ore blocks belong in Minecraft's Natural Blocks tab. Adding a `Block` here displays its registered `BlockItem` in the inventory.

```java
public static void initialize() {
    ItemGroupEvents.modifyEntriesEvent(ItemGroups.NATURAL)
            .register(entries -> {
                entries.add(<STONE_ORE_BLOCK_NAME>);
                entries.add(<DEEPSLATE_ORE_BLOCK_NAME>);
            });
}
```

### Complete `ModBlocks.java` template

This combines the two ore block fields, shared registration helper, and Creative inventory setup into one ready-to-customize organizer class.

```java
package <your_modpackagename>;

import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.block.AbstractBlock;
import net.minecraft.block.Block;
import net.minecraft.block.Blocks;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.item.ItemGroups;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;

public class ModBlocks {

    public static final Block <STONE_ORE_BLOCK_NAME> = register(
            "<stone_ore_block_path>",
            new Block(AbstractBlock.Settings.copy(Blocks.IRON_ORE))
    );

    public static final Block <DEEPSLATE_ORE_BLOCK_NAME> = register(
            "<deepslate_ore_block_path>",
            new Block(AbstractBlock.Settings.copy(Blocks.DEEPSLATE_IRON_ORE))
    );

    private static Block register(String name, Block block) {
        Identifier id = <EntryPointClass>.id(name);

        Block registeredBlock = Registry.register(
                Registries.BLOCK,
                id,
                block
        );

        Registry.register(
                Registries.ITEM,
                id,
                new BlockItem(registeredBlock, new Item.Settings())
        );

        return registeredBlock;
    }

    public static void initialize() {
        ItemGroupEvents.modifyEntriesEvent(ItemGroups.NATURAL)
                .register(entries -> {
                    entries.add(<STONE_ORE_BLOCK_NAME>);
                    entries.add(<DEEPSLATE_ORE_BLOCK_NAME>);
                });
    }
}
```

## Load `ModBlocks`

Add `ModBlocks.initialize()` to the entry-point class's existing `onInitialize()` method. This causes Java to load the organizer class and register its blocks during mod initialization.

```java
@Override
public void onInitialize() {
    ModItems.initialize();
    ModBlocks.initialize();

    LOGGER.info("Hello Fabric world!");
}
```

## Language File

Add one translation entry per block to `src/main/resources/assets/<mod-id>/lang/en_us.json`. Block translation keys begin with `block`, not `item`.

```json
{
    "block.<mod-id>.<stone_ore_block_path>": "<Stone Ore Display Name>",
    "block.<mod-id>.<deepslate_ore_block_path>": "<Deepslate Ore Display Name>"
}
```

If the file already contains item translations, add these entries to the same JSON object and separate all entries with commas.

## Block Models

Create one model per block at `src/main/resources/assets/<mod-id>/models/block/<block_path>.json`. The `cube_all` parent applies one texture to all six faces.

```json
{
    "parent": "minecraft:block/cube_all",
    "textures": {
        "all": "<mod-id>:block/<block_path>"
    }
}
```

## Block Textures

Place each texture at the following path. Its filename must match the path referenced by the block model.

```text
src/main/resources/assets/<mod-id>/textures/block/<block_path>.png
```

Act 3 recommends `16 × 16` pixel PNG images. Because these are full cube faces, the textures normally fill the complete image rather than using transparency.

## Blockstates

Create one blockstate file per block at `src/main/resources/assets/<mod-id>/blockstates/<block_path>.json`. The empty variant selects the model for a block that has no special state properties such as facing or lit.

```json
{
    "variants": {
        "": {
            "model": "<mod-id>:block/<block_path>"
        }
    }
}
```

## BlockItem Models

Create one inventory model per block at `src/main/resources/assets/<mod-id>/models/item/<block_path>.json`. It inherits the block model so the item appears as the same three-dimensional cube in inventories and players' hands.

```json
{
    "parent": "<mod-id>:block/<block_path>"
}
```

## Resource Checklist for Each Block

Each stone or deepslate ore block needs these files, all using the same `<block_path>`:

```text
assets/<mod-id>/blockstates/<block_path>.json
assets/<mod-id>/models/block/<block_path>.json
assets/<mod-id>/models/item/<block_path>.json
assets/<mod-id>/textures/block/<block_path>.png
```

It also needs a `block.<mod-id>.<block_path>` entry in `lang/en_us.json`.

## Build and Test Commands

Run the build command to compile the Java code, validate resources, and create the mod JAR.

```text
./gradlew build
```

Run the development client to confirm that both blocks appear in the Natural Blocks tab, display correctly as items, and can be placed with the correct textures.

```text
./gradlew runClient
```
