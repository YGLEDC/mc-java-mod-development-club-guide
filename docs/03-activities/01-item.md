# Act 1: Item

> Learn to mod your first item from creating a custom ore!

## Objective & Introduction

You will know how to create a basic item in Minecraft through this activity!

Thanks to Rosa, we will use her art resource "Ice Cream Resource Pack" - "act1.png" for this activity.

![ice cream ingot](../assets/images/activities/act-1/01.png "ice cream ingot"){ .pixel-art width="150" }


> [Download the art resource](../assets/resource/Ice_Cream_Resource_Pack.zip)

> The resource is only for tutorial use. If you want to use it in your own mod, you should check out [Club Artist Contributions](../06-credits/index.md#club-artist-contributions) for specifc permissions.

If you decide to create your own, read the Art Resource Requirement for Act 1 below.

## Art Resource Requirement

- It should be a texture for an Ingredient, smelt from a raw ore (you will create the raw ore in Act 2), such as a Minecraft's Iron Ingot.

![iron ingot](../assets/images/activities/act-1/02.png "iron ingot"){ .pixel-art width="150" }

> Minecraft's iron ingot

> You don't need to follow a ingot-like shape

- Must be at least **16 x 16** **Pixel Grid** size. You can increase the resolution by 2 each time. Acceptable resolutions are: 16x16, 32x32, 64x64, 128x128, etc. We recommend 16x16 or 32x32 for Act 1.

- Must be a **PNG** file. 

## 1. Setup

- Go to [Template Mod Generator](https://fabricmc.net/develop/template/).

- Configurate your template and download the zip file.

!!! warning
    Your Mod ID and Package Name should be unique to prevent conflicts!
    
    However, for learning purposes, you can use the same configurations as below.

> - Mod Name: Ice Cream
- Mod ID: ice-cream
- Package Name: com.ygledc.icecream
- Version: 1.21.1
- Advance Option: Check only "Data Generation" and "Split client and common sources"

> This template would be used for many activities! Not just Act 1.

- Unzip the zip file, and open the folder in IntelliJ.

> Make sure you have followed all instructions in [Template Mod Generator](../02-setup/04-template-mod-generator.md) to set up properly in IntelliJ.

## 2. Register Your Item







Temporary Doc:

```java
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
```

```java
public class ModItems {

public static final Item <ITEM_NAME> = register("item_name", new Item(new Item.Settings()));


private static Item register(String name, Item item) {

return Registry.register(Registries.ITEM, <ModClassName>.id(name), item);

}

}
```

```java
import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.item.ItemGroups;
```
```java
public static void initialize() {
ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
.register(entries -> entries.add(<ITEM_NAME>));
}
```

```java
ModItems.initialize();
```

```java
./gradlew build
```

```java
{
"item.<mod-id>.item_name": "<Name of Item That You Want to Appear>"
}
```

```java
{
"parent": "minecraft:item/generated",
"textures": {
"layer0": "<mod-id>:item/<item_name>"
}
}
```
