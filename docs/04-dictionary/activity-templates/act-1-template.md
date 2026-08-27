# Act 1 Template

These templates come from [Act 1: Item](../../03-activities/01-item.md). Replace every value inside angle brackets, such as `<mod-id>`, with the matching value from your project.

## Project Information

Record these values before editing code or resources. They determine the names and locations used throughout the mod.

```text
Mod Name: <mod-name>
Mod ID: <mod-id>
Package Name: <your_modpackagename>
Minecraft Version: 1.21.1
Item Variable Name: <ITEM_VAR_NAME>
Item Path: <item_path>
Item ID: <mod-id>:<item_path>
```

## `ModItems.java`

This organizer class creates the item, registers it with Minecraft, and adds it to a Creative inventory tab.

Create it at:

```text
src/main/java/<your_modpackagename>/ModItems.java
```

### Package declaration

The package declaration tells Java which package contains `ModItems.java`.

```java
package <your_modpackagename>;
```

### Class declaration

This creates the `ModItems` organizer class. Its name must match the filename.

```java
public class ModItems {

}
```

### Item registration imports

These imports provide Minecraft's item class and registry APIs.

```java
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
```

### General object-construction forms

These forms show how a Java constructor creates an object and how the result can be stored in a variable.

```java
new <ClassName>();
new <ClassName>(<argument1>);
new <ClassName>(<argument1>, <argument2>);

<VariableType> <variableName> = new <ClassName>();
<VariableType> <variableName> = new <ClassName>(<argument1>);
```

### General registry form

This registers an object in the appropriate Minecraft registry and assigns it an identifier from your mod's entry-point class.

```java
Registry.register(
        <Registries.REGISTRY>,
        <EntryPointClass>.id(<path>),
        <ObjectType object>
);
```

For an item, the registry is `Registries.ITEM`, the path is a string, and the object is an `Item`.

```java
Registry.register(
        Registries.ITEM,
        <EntryPointClass>.id("<item_path>"),
        new Item(new Item.Settings())
);
```

### Reusable item registration method

This helper method avoids repeating the full registry call for every item. It receives an item path and item object, registers the item, and returns it.

```java
private static Item register(String name, Item item) {
    return Registry.register(Registries.ITEM, <EntryPointClass>.id(name), item);
}
```

### Item field

This field creates and registers one basic item. The constant gives the rest of your code a reusable reference to that item.

```java
public static final Item <ITEM_VAR_NAME> = register(
        "<item_path>",
        new Item(new Item.Settings())
);
```

### Creative inventory imports

These imports provide Fabric's item-group event and Minecraft's existing Creative inventory groups.

```java
import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.item.ItemGroups;
```

### Add one item to a Creative inventory tab

This event adds the registered item to the selected Creative inventory group.

```java
ItemGroupEvents.modifyEntriesEvent(ItemGroups.<INVENTORY_GROUP>)
        .register(entries -> {
            entries.add(<ITEM_VAR_NAME>);
        });
```

Act 1 uses `ItemGroups.INGREDIENTS` for an ingredient item.

### Add multiple items to a Creative inventory tab

Use additional `entries.add(...)` calls when several items belong in the same tab.

```java
ItemGroupEvents.modifyEntriesEvent(ItemGroups.<INVENTORY_GROUP>)
        .register(entries -> {
            entries.add(<ITEM_VAR_NAME_1>);
            entries.add(<ITEM_VAR_NAME_2>);
        });
```

### Initializer method

The entry-point class calls this method to load `ModItems` and add its items to the Creative inventory.

```java
public static void initialize() {
    ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
            .register(entries -> {
                entries.add(<ITEM_VAR_NAME>);
            });
}
```

### Complete `ModItems.java` template

This combines the Act 1 item field, registration helper, and Creative inventory setup into one ready-to-customize file.

```java
package <your_modpackagename>;

import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.item.Item;
import net.minecraft.item.ItemGroups;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;

public class ModItems {

    public static final Item <ITEM_VAR_NAME> = register(
            "<item_path>",
            new Item(new Item.Settings())
    );

    private static Item register(String name, Item item) {
        return Registry.register(Registries.ITEM, <EntryPointClass>.id(name), item);
    }

    public static void initialize() {
        ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
                .register(entries -> {
                    entries.add(<ITEM_VAR_NAME>);
                });
    }
}
```

## Entry-Point Class

Add this call inside the existing `onInitialize()` method. It loads `ModItems`, causing the item registration and Creative inventory setup to run when Fabric initializes the mod.

```java
@Override
public void onInitialize() {
    ModItems.initialize();

    LOGGER.info("Hello Fabric world!");
}
```

Act 1's generated entry-point class also uses this identifier helper. It creates identifiers in the form `<mod-id>:<path>` for registry entries.

```java
public static Identifier id(String path) {
    return Identifier.of(MOD_ID, path);
}
```

## Language File

Create this file at `src/main/resources/assets/<mod-id>/lang/en_us.json`. It maps the item's translation key to the English name displayed in Minecraft.

```json
{
    "item.<mod-id>.<item_path>": "<English Item Name>"
}
```

## Item Model

Create this file at `src/main/resources/assets/<mod-id>/models/item/<item_path>.json`. It gives the item Minecraft's standard generated-item model and connects that model to your texture.

```json
{
    "parent": "minecraft:item/generated",
    "textures": {
        "layer0": "<mod-id>:item/<item_path>"
    }
}
```

## Item Texture

Place the texture at the following path. Its filename must match the item path referenced by the model.

```text
src/main/resources/assets/<mod-id>/textures/item/<item_path>.png
```

The image must be a PNG with a transparent background. Act 1 recommends a `16 × 16` pixel texture.

## Build and Test Commands

Run the build command to compile the Java code, check for errors, process resources, and create the mod JAR.

```text
./gradlew build
```

Run the development client to test the registered item, Creative inventory placement, name, model, and texture in Minecraft.

```text
./gradlew runClient
```
