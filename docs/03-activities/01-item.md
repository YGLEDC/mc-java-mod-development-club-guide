# Act 1: Item

> Learn to mod your first item from creating a custom ore!

## Objective & Introduction

You will know how to create a basic item in Minecraft through this activity!

Specifically, we will create an **Ingredient** for our mod, similar to iron ingot.

Thanks to Rosa, we will use her art resource "Ice Cream Resource Pack" - "act1.png" for this activity. This is a texture of an **Ice Cream Ingot**!

![ice cream ingot](../assets/images/activities/act-1/01.png "ice cream ingot"){ .pixel-art width="150" }


> [Download the art resource](../assets/resource/Ice_Cream_Resource_Pack.zip)

> The resource is only for tutorial and play use. If you want to use it in your published mod, you should check out [Club Artist Contributions](../06-credits/02-club-artist-contributions.md) for specifc permissions.

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
    Your Mod ID and Package Name should be unique to prevent conflicts with other mods.
    
> Below is the configuration we use for Act 1. 

> - Mod Name: Ice Cream
- Mod ID: ice-cream
- Package Name: com.ygledc.icecream
- **Version: 1.21.1** (fixed)
- **Advance Option: Check only "Data Generation" and "Split client and common sources"** (fixed)

> This template would be used for many activities! Not just Act 1.

- Unzip the zip file, and open the folder in IntelliJ.

> Make sure you have followed all instructions in [Template Mod Generator](../02-setup/04-template-mod-generator.md) to set up properly in IntelliJ.

!!!tip
    Have a separate piece of paper out (or a doc opened), and write your mod's info on it, including your **Mod Name, Mod ID, and Package Name**. This would greatly help you recognize code later in complex structures.

## 2. Register Your Item

### Create a Class

Before we code any thing, recall what Minecraft is in terms of programming styles (Java OOP).

Remember that Minecraft is a typical example of **Object Oriented Programming**, which consists of Class and Objects, such as the Zombie Class and Zombie Objects (Zombies spawn in your world).

Therefore, if you want an item to exist in Minecraft, you would need to create a **Class** for your item.

Recall that you want your mod's Java code to be placed in **src/main/java/modpackagename/**, which in this case is **src/main/java/com/ygledc/icecream/** because the package name is **"com.ygledc.icecream"**. 

In order to create a new class for your items, you would like to create a new **java file** that holds your class.

What should you name your Java file? Well, a mod may have tools, items, etc. We are creating an item now, so you should create a specific class that holds your **mod's item**.

- ==Create a Java file named **"ModItems.java"** in src/main/java/modpackagename/.==

- This could be done by clicking the directory you want to add the java file to (which is src/main/java/modpackagename/). The directory should be in blue highlight; Then, click the "+" icon on top of your left panel; choose "file", and write "ModItems.java".

> you follow the naming convention here, that is why it is named "ModItems"

> ".java" tells IntelliJ that it is a java file

**ModItems.java** is the place that stores your **Class** for all **Items** in your mod.

==Now, inside this file, we have to do **Package Declaration** to tell Java where this file is located at (telling Java the address of this file), simply adding the following code in the very top of this file:==

```java
package <your_modpackagename>; 
//This should be package name that you've entered for your mod in the template generator!!!
```
Recall that anything under **src/main/java**, which is the **source root**, is considered inside your main java package. Correspondingly, your **ModItems.java** is located in src/main/java/modpackagename/. 

**The idea here is, any java file inside the main package, should have a package declaration that tells java where the file is at.**

My package declaration would be:
```java
package com.ygledc.icecream;
```

Then, you need to create a class. Here is how you create a class:
```java
public class ModItems{

}
```
Here are the components:

- **public**: means that this class is accessible from anywhere
- **class**: tells java that you are defining a class
> **public** and **class** are **keywords** in Java; You will learn more as you go.
- **ModItems**: the name of your class
> **ModItems** is the top-level class in this file, so it MUST match the file name and be "public". A file can only have ONE top-level class; your top-level-class can contain more classes, but it cannot be inside another class. Think of it as the Biggest Class in your java file.

Now, you should realize that your "ModItems.java" on the left panel becomes "ModItems" with a blue icon "C". This is normal, and it means that you've successfully created a top-level class!

!!!tip
    Shortcut: you can quickly create a Java file with package declaration and its top-level class by choosing "Java Class" when clicking the "+" icon. It would automatically generate the package declaration and the top-level class. 

### Import Packages 01

After having a class for your mod's items, you would want to create the item, right?

However, we don't have the code, or **methods** to access Minecraft, unless we **import** them.

Minecraft has a default **Library** that have many **packages**, these **packages** have **Classes** that contain the **Methods** we need to create an **Item** for our mod.

==Import the following classes under your package declaration:==
```java
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
```

What each import mean:

- You import the class **"Item"** from the package **"net.minecraft.item"**
- You import the class **"Registries"** from the package **"net.minecraft.registry"**
- You import the class **"Registry"** from the package **"net.minecraft.registry"**

Each class has some methods we need. We cannot use them unless we import their classes.

These classes all come from Minecraft's Library! You will also use classes from the **Fabric Library** later.

Below is the basic structure:
```java
Your project
├── com/ygledc/icecream
│   └── IceCream.java

Minecraft library
└── net/minecraft/item
    └── Item.java
    ...

Fabric library
└── net/fabricmc/...
```

What each class can offer:

- Item Class: It has a top-level class "Item", which allows you to create an **Item Object** to represent your mod's item
> Every Item in Minecraft is an Item Object!
- Registries Class: It has a top-level class "Registries" that contains many different types of Registries, such as the one we will use: Registries.ITEM
> Registries are collections that hold the references to different types of items. 

> Think of Registries as a dictionary. After an item is created by code, Minecraft needs to know it exists. You do that by registering the item to one of the **Registries**, depending on what type of item it is.

> ==A simple analogy: you all need to complete school registration to let South Hills know that you are in the school! Although you do go to school, but the school doesn't know you are a member of the school if they don't see your registration! Depending on your grade, you are assigned to the one of the four registries: 9th, 10th, 11th, or 12th.==

- Registry Class: It has a top-level class "Registry" that contains **Registry Objects**. Those objects have certain **Methods** you can use to register your item to the **Registries**.
> Same analogy: it is like the tool (Aeries) you needed to complete your school's registration.

### Create & Register Your Item
> To be updated.

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
