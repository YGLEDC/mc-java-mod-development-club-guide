# Act 2 Template

These templates come from [Act 2: Item Features 01](../../03-activities/02-item-features-01.md). Act 2 builds on the Act 1 project by adding a raw material item and a food item with configurable food properties and status effects.

Replace every value inside angle brackets, such as `<mod-id>`, with the matching value from your project.

## Item Information

Record the names and paths of both new items before editing code or resources. The variable names are Java constants, while the item paths become part of each Minecraft item ID.

```text
Raw Item Variable Name: <RAW_ITEM_NAME>
Raw Item Path: <raw_item_path>
Raw Item ID: <mod-id>:<raw_item_path>

Food Item Variable Name: <FOOD_ITEM_NAME>
Food Item Path: <food_item_path>
Food Item ID: <mod-id>:<food_item_path>
Food Component Name: <FOOD_COMPONENT_NAME>
```

## Create and Register Items

Add one field for each new item inside the existing `ModItems` class. Each field creates a basic item and registers it using the helper method from Act 1.

```java
public static final Item <ITEM_NAME> = register(
        "<item_path>",
        new Item(new Item.Settings())
);
```

Use the template twice: once for the raw item and once for the food item. The food item's settings will be updated after its food component is created.

## Creative Inventory Tabs

### Food tab registration

This event places a registered food item in Minecraft's Food & Drinks Creative inventory tab.

```java
ItemGroupEvents.modifyEntriesEvent(ItemGroups.FOOD_AND_DRINK)
        .register(entries -> {
            entries.add(<FOOD_ITEM_NAME>);
        });
```

### Updated initializer

This version of `initialize()` places the Act 1 ingredient and new raw material in the Ingredients tab, while placing the new food item in the Food & Drinks tab.

```java
public static void initialize() {
    ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
            .register(entries -> {
                entries.add(<ACT_1_ITEM_NAME>);
                entries.add(<RAW_ITEM_NAME>);
            });

    ItemGroupEvents.modifyEntriesEvent(ItemGroups.FOOD_AND_DRINK)
            .register(entries -> {
                entries.add(<FOOD_ITEM_NAME>);
            });
}
```

## Language File

Add translation entries for the new items to `src/main/resources/assets/<mod-id>/lang/en_us.json`. Commas separate the entries, but the final entry does not have a trailing comma.

```json
{
    "item.<mod-id>.<act_1_item_path>": "<Act 1 Item Display Name>",
    "item.<mod-id>.<raw_item_path>": "<Raw Item Display Name>",
    "item.<mod-id>.<food_item_path>": "<Food Item Display Name>"
}
```

## Item Models

Create one model file for each new item in `src/main/resources/assets/<mod-id>/models/item/`. Each filename must match its item's path.

```text
<item_path>.json
```

The model uses Minecraft's generated two-dimensional item model and points it to the corresponding texture.

```json
{
    "parent": "minecraft:item/generated",
    "textures": {
        "layer0": "<mod-id>:item/<item_path>"
    }
}
```

## Item Textures

Place both PNG textures in `src/main/resources/assets/<mod-id>/textures/item/`. Each filename must match the item path used by its model.

```text
<item_path>.png
```

Act 2 recommends `16 × 16` pixel PNG images with transparent backgrounds.

## Food Component

### Food component import

This import provides the class used to define a food item's nutrition and other eating properties.

```java
import net.minecraft.component.type.FoodComponent;
```

### Basic food component

This builder creates a reusable food configuration. `nutrition` controls hunger points restored, `saturationModifier` controls saturation, and `alwaysEdible` allows the item to be eaten with a full hunger bar.

```java
public static final FoodComponent <FOOD_COMPONENT_NAME> = new FoodComponent.Builder()
        .nutrition(<int_nutrition_value>)
        .saturationModifier(<float_saturation_modifier>)
        .alwaysEdible()
        .build();
```

Write float values with an `f` suffix, such as `0.6f`. Declare the food component above the food item field because Java initializes static fields from top to bottom.

Other available builder options from Act 2 include:

```java
.alwaysEdible()
.snack()
```

`alwaysEdible()` permits eating while full, and `snack()` makes the item quicker to eat.

## Status Effects

### Status effect imports

These imports provide Minecraft's effect constants and the class representing a configured effect with a duration and amplifier.

```java
import net.minecraft.entity.effect.StatusEffectInstance;
import net.minecraft.entity.effect.StatusEffects;
```

### Status effect instance

This creates one status effect configuration. Duration is measured in ticks at approximately 20 ticks per second. Amplifier `0` means level I, `1` means level II, and so on.

```java
new StatusEffectInstance(
        StatusEffects.<EFFECT_NAME>,
        <int_duration_in_ticks>,
        <int_amplifier>
)
```

### Food component with one status effect

The `statusEffect` builder method adds an effect and the probability that eating the food applies it. Use `1.0f` for a 100% chance.

```java
public static final FoodComponent <FOOD_COMPONENT_NAME> = new FoodComponent.Builder()
        .nutrition(<int_nutrition_value>)
        .saturationModifier(<float_saturation_modifier>)
        .statusEffect(
                new StatusEffectInstance(
                        StatusEffects.<EFFECT_NAME>,
                        <int_duration_in_ticks>,
                        <int_amplifier>
                ),
                <float_chance>
        )
        .alwaysEdible()
        .build();
```

### Food component with multiple status effects

Chain another `statusEffect(...)` call before `build()` for every additional effect the food may apply.

```java
public static final FoodComponent <FOOD_COMPONENT_NAME> = new FoodComponent.Builder()
        .nutrition(<int_nutrition_value>)
        .saturationModifier(<float_saturation_modifier>)
        .statusEffect(
                new StatusEffectInstance(
                        StatusEffects.<EFFECT_NAME_1>,
                        <int_duration_in_ticks_1>,
                        <int_amplifier_1>
                ),
                <float_chance_1>
        )
        .statusEffect(
                new StatusEffectInstance(
                        StatusEffects.<EFFECT_NAME_2>,
                        <int_duration_in_ticks_2>,
                        <int_amplifier_2>
                ),
                <float_chance_2>
        )
        .alwaysEdible()
        .build();
```

## Attach the Food Component

Pass the completed food component to `Item.Settings.food(...)`. This changes the registered basic item into an edible item with the component's nutrition, saturation, and effects.

```java
public static final Item <FOOD_ITEM_NAME> = register(
        "<food_item_path>",
        new Item(new Item.Settings().food(<FOOD_COMPONENT_NAME>))
);
```

The `<FOOD_COMPONENT_NAME>` field must appear above this item field in `ModItems.java`.

## Build and Test Commands

Run the build command to compile the Java code, validate resources, and create the mod JAR.

```text
./gradlew build
```

Run the development client to confirm that both items appear in the correct inventory tabs and that the food restores hunger and applies its configured effects.

```text
./gradlew runClient
```
