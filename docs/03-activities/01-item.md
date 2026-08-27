# Act 1: Item

> Learn to mod your first item from creating a custom ore!

> Act 1 would be a heavy-content activity. If you are a complete beginner, you will see many new concepts and definitions here, so it is recommended to take your pace slow, or join the Activity Party for Act 1.

> Everything is hard at the beginning. After Act 1, you will have a basic mindset of Mod Development!

> If you feel stuck, it is recommended to reach out for help in GC or Discord. You can also make good use of your search engine!

## Objective & Introduction

You will know how to create a basic item in Minecraft through this activity!

Specifically, you will create an **Ingredient** (ingot/gem) for you mod, similar to iron ingot.

Thanks to Rosa, we will use her art resource "Ice Cream Resource Pack" - `act1.png` for this activity. This is a texture of an **Ice Cream Ingot**!

![ice cream ingot](../assets/images/activities/act-1/01.png "ice cream ingot"){ .pixel-art width="150" }


> [Download the art resource](../assets/resource/Ice_Cream_Resource_Pack.zip)

> The art resources are only for club guide and play use. If you want to use them for other purposes, you should check out [Club Artist Contributions](../06-credits/02-club-artist-contributions.md) for specifc permissions of each author.

You can also create your own, which is recommended if you want your final product to become a personal comprehensive mod! Read the Art Resource Requirement for Act 2 below.


## Art Resource Requirement

- It should be a texture for an Ingredient (ingot/gem), smelt from a raw ore (you will create the raw ore in Act 2), such as a Minecraft's Iron Ingot:

![iron ingot](../assets/images/activities/act-1/02.png "iron ingot"){ .pixel-art width="150" }

> You don't need to follow a ingot-like shape

- Must be at least `16 x 16` **Pixel Grid** size, with **Transparent Background**. You can increase the resolution by 2 each time. Acceptable resolutions are: `16x16`, `32x32`, `64x64`, `128x128`, etc. We recommend `16x16` for Act 1.

- Must be a **PNG** file.

## 1. Setup

!!! task "Open the Template Mod Generator"
    Go to the [Template Mod Generator](https://fabricmc.net/develop/template/).

!!! task "Configure and download the template"
    Configure your template and download the ZIP file.

!!! warning
    Your Mod ID and Package Name should be unique to prevent conflicts with other mods.

> Below is the configuration I use for Act 1.

> - Mod Name: Ice Cream
- Mod ID: ice-cream
- Package Name: com.ygledc.icecream
- Version: `1.21.1` (fixed)
- Advance Option: Check only `Data Generation` and `Split client and common sources` (fixed)

> This project folder would be used for many activities!

!!! task "Open the project in IntelliJ"
    Unzip the downloaded file, then open the project folder in IntelliJ.

> Make sure you have followed all instructions in [Template Mod Generator](../02-setup/04-template-mod-generator.md) to set up properly in IntelliJ.

Below are some general tips for you!

It is recommended to do so at the beginning of Mod Development.

!!!tip
    Have a separate piece of paper out (or a doc opened), and write your mod's info on it, including your **Mod Name, Mod ID, and Package Name**. This would greatly help you recognize code later in complex structures.

!!!tip
    Have a separate piece of paper out (or a doc opened), and write your mod's items info on it when you code them, such as the `ITEM_NAME`, `item_path`, `mod-id:item_path`, etc.

## 2. Register Your Item

### Create a Class

Before we code any thing, recall what Minecraft is in terms of programming styles (Java OOP).

Minecraft is a typical example of **Object Oriented Programming**, which consists of Class and Objects, such as the Zombie Class and Zombie Objects (Zombies spawn in your world).

Therefore, if you want an item to exist in Minecraft, you would need to create a **Class** for your item.

Recall that you want your mod's Java code to be placed in `src/main/java/modpackagename/`, which in my case is `src/main/java/com/ygledc/icecream/` because my package name is `com.ygledc.icecream`.

In order to create a new class for your items, you would like to create a new **java file** that holds your class.

What should you name your Java file? Well, a mod may have tools, items, etc. We are creating an item now, so you should create a specific class that holds your **mod's item**.

**HOWEVER!!!!...**

The objective of this activity is creating an item for your mod. Is it really necessary to create a new class for your item?

Can we just use the existing **Item Class** in Minecraft???

The answer is yes. For this first activity, we are just creating an `Item` for your mod. Therefore, using the existing `Item` class to create an **Item Object**, is the most convenient solution!

> When do you need your own class? You need your own class when you want some custom **Attributes** that **existing Minecraft Classes don't offer**. You will learn how to do that in future activities.

> Before we go on, you will need to learn some knowledge regarding this new term --- **Constructor**:

!!!concept "Constructor"
    **Constructor** is the initializer of a class. If you want to create an **Object** for your class, you need an initializer called **Constructor**. This is a special type of **Method** you use to create an **Object** for the class.

    Think of it as the actual template / blueprint for the class to use to create an object.

    You will learn how to build your own Constructor in future activities. For now, you only need to understand that a Class needs a Constructor to create objects (instances).

After knowing what **Constructor** is, you should relate this concept with the existing `Item` class. Minecraft's `Item` class actually has a constructor that we can use.

Now we've actually solved the class and object issue. But a new issue rises: although we know that we can use the existing class for our item, we need a place to **instantiate** (a technical term for "create") the item. In other words, we need a place to call the **Construtcor Method**.

> Think of "Why" this issue rises: you have the class, you have the constructor needed, however, there is currently no place where you can create the item. The Class only provides the template, the constructor only offers the method to use the template. You need a place to call (technical term for "use") the method. What should you do?

The solution is, we can create a Java Class, a place where you can instantiate your Item object. This is actually called an **Organizer Class** in mod development.

Perhaps in the future, we have more items, and this place would be where we instantiate all your mod's items.

And perhaps in the future, you have blocks, then we will create a separate **Organizer Class** for your mod's blocks.

The way to create an organizer class:

!!! task "Create `ModItems.java`"
    Create a Java file named `ModItems.java` in `src/main/java/modpackagename/`.

    > This could be done by first clicking the directory where you want to add the java file to (which is `src/main/java/modpackagename/`). The directory should be in blue highlight after selecting; Then, click the **"+"** icon on top of your left panel; choose **file**, and write `ModItems.java`.

    > you follow the naming convention here, that's why it is `ModItems`

    > `.java` tells IntelliJ that it is a java file

`ModItems.java` is the place that organizes all your code to instantiate objects for your mod.

!!! task "Declare the package"
    At the very top of `ModItems.java`, add a **Package Declaration** that tells Java where the file is located:

    ```java
    package <your_modpackagename>;
    //This should be package name that you've entered for your mod in the template generator!!!
    ```

Recall that anything under `src/main/java`, which is the **source root**, is considered inside your main java package. Correspondingly, your `ModItems.java` is located in `src/main/java/modpackagename/`.

**The idea here is, any java file inside the main package, should have a package declaration that tells java where the file is at.**

My package declaration would be:
```java
package com.ygledc.icecream;
```

!!!task "Create a class"
    Then, you need to create a class. Here is how you create the class for `ModItems.java`:
    ```java
    public class ModItems{

    }
    ```
Here are the components:

- `public`: means that this class is accessible in other classes (other code can use this class)
- `class`: tells java that you are defining a class
> `public` and `class` are **keywords** in Java; You will learn more as you go.
- `ModItems`: the name of your class
> `ModItems` is the top-level class in this file, so it MUST match the file name and be `public`. A file can only have ONE top-level class; your top-level-class can contain more classes, but it cannot be inside another class. Think of it as the Biggest Class in your java file.

You should realize that your `ModItems.java` on the left panel becomes `ModItems` with a blue icon `C`. This is normal, and it means that you've successfully created a top-level class!

!!!tip "Shortcut"
    You can quickly create a Java file with package declaration and its top-level class by choosing **Java Class** when clicking the **"+"** icon. It would automatically generate the package declaration and the top-level class.

### Import Classes 01

After having the organizer class, you would want to instantiate the item, right?

However, we don't have the code, or **methods** to access Minecraft, unless we `import` them.

Minecraft has a default **Library** that have many **packages**, these **packages** have **Classes** that contain the **Methods** we need to create an `Item` for our mod.

!!! task "Import the item registration classes"
    Import the following classes under your package declaration:

    ```java
    import net.minecraft.item.Item;
    import net.minecraft.registry.Registries;
    import net.minecraft.registry.Registry;
    ```

What each import mean:

- You import the class `Item` from the package `net.minecraft.item`
- You import the class `Registries` from the package `net.minecraft.registry`
- You import the class `Registry` from the package `net.minecraft.registry`

Each class has some methods we need. We cannot use them unless we import their classes.

These classes all come from Minecraft's Library! You will also use classes from the **Fabric Library** later.

Below is the basic structure if you are interested:
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

- Item Class: It has a top-level class `Item`, which allows you to instantiate an **Item Object** to represent your mod's item
> Every Item in Minecraft is an Item Object!
- Registries Class: It has a top-level class `Registries` that contains many different types of Registries, such as the one we will use: `Registries.ITEM`
> Registries are collections that hold the references to different types of items.

> Think of Registries as a dictionary. After an item is created by code, Minecraft needs to know it exists. You do that by registering the item to one of the `Registries`, depending on what type of item it is.

> A simple analogy: you all need to complete school registration to let South Hills know that you are in the school! Although you do go to school, but the school doesn't know you are a member of the school if they don't see your registration! Depending on your grade, you are assigned to the one of the four registries: 9th, 10th, 11th, or 12th.

- Registry Class: It has a top-level class `Registry` that contains **Registry Objects**. Those objects have certain **Methods** you can use to register your item to the `Registries`.
> Same analogy: it is like the tool (Aeries) you needed to complete your school's registration.

### Create & Register Your Item

We will create the item and register it to Minecraft using these imported classes and methods.

How to create an item? More specifically, how to create an object (instance) for the `Item` class? We will use the constructor. The official way to use (call) a class's constructor in Java is below:

```java
new <ClassName>();
//a constructor that creates a <ClassName> object with no parameter
new <ClassName>(<argument1>);
//a constructor that creates a <ClassName> object with 1 parameter
new <ClassName>(<argument1>, <argument2>, ...);
//a constructor that creates a <ClassName> object with multiple parameters

<VarType> <VarName> = new <ClassName>();
<VarType> <VarName> = new <ClassName>(<argument1>);
<VarType> <VarName> = new <ClassName>(<argument1>, <argument2>, ...);
// assign the created object to a variable named <VarName>
```
!!!concept
    **Parameter vs Argument vs Attribute**

    Parameter = placeholder in the method/constructor definition

    Argument = actual value passed in to the method (function) when calling it

    The thing you pass in to the method (function) is your Argument.
    When you call the function, Parameter, which is the placeholder, accepts your Argument.
    Then, it assigns them to the **attributes** of this created object.

    Attributes are represented by **variables**, like
    ```java
    int x = 1;

    String color = "red";

    int damage = 10;
    ```
    The Path:

        Argument  -> Parameter -> Attributes of the Created Objects (variables)

    This process is like telling what attributes you want your object to have. This is defined in the Constructor method of the class.

    (you will know more about this concept as you learn)

What each components are:

- `VarType` : The type of variable you want to create; should match <Classname>
- `VarName` : The name of the variable
- `=` : the assign operator, used to assign things from the right side to the left side; this is not equal sign in Java!!!
- `new` : the keyword used to create (instantiate) new objects
- `ClassName` : The name of the class; should match <VarType>
- `arguments` : The values you want your object's attributes to have; the type and number of arguments accepted is defined by the constructor
> a semicolon `;` is needed at the end!

So, if we follow the original template to create a Minecraft Item from the Item class, and assign it to a variable:
```java
Item IceCreamIngot = new Item(<parameters>);
```

However, unluckily, this is only the steps for creation. Remember we still have to register the item?

I mean, this is too much work to do. I don't want to do all that.

Is there an alternative way? The answer is YES.

In Mod Development, we usually **create** and **register** an item in just one line! How can we do that?

Well the first problem we have to solve is to find a way to register the item.

Remember we've imported the class `Registry`. It has the **Method** we needed to register an item.

`Registry` class has a method called `register`, when you use it, it takes in **3 arguments** and returns (output) the **registered object**. To use that method, specifically to register an Item object to `Registries.ITEM`, you do the folllowing:
```java
Registry.register(Registries.ITEM, <EntryPointClass>.id(<String item_path>), <ItemObject>);

//this is the specific form of registering an item to Registries.ITEM
//Registries.ITEM comes from the imported Registries class

Registry.register(Registries.ITEM,
    <EntryPointClass>.id(<String item_path>),
    <ItemObject>);

//this is equivalent to the top
//but better formatting for readability


Registry.register(<Registries.REGISTRIES>,
    <EntryPointClass>.id(<String item_path>),
    <ObjectType Object>);

//This is the general form if you'are interested
```
The 3 arguments for the general form are `<Registries.REGISTRIES>`, `<EntryPointClass>.id(String <item-path>)`, and `<ObjectType Object>`.

* `Registries.REGISTRIES` : What registries do you want to add your item to? (e.g., Registries.ITEM)
* `EntryPointClass` : Your mod's entry point class. This is already generated based on your **Mod Name** without spaces. You can also see yours on the left panel under `src/main/java/modpackagename/`
* `item_path` : Your Item's path. You will create it later. It needs to be a `String` data type.
* `ObjectType Object`: The object that stands for your item. Needs to be an `ObjectType` that macthes your Object. For example, an Item Object that is an `Item`.

!!!concept
    **Dot Notation**

    1. This is something you use to use a method outside of your class. In this case, you've imported Registry class, but in order to use its method, you have to use a dot `.` between the class and its method.

        Similarly, you also use dot notation to access the attribute `ITEM` of `Registries` class like `Registries.ITEM`.

        However, if you are calling the attribute or method **inside** their class, you don't need Dot Notation.

        Example:

        - You do `register(...)` if you are calling the method inside `Registry` class

        - You do `Registry.register(...)` if you are calling the method outside `Registry` class

        - In ` <EntryPointClass>.id(<item_path>)`, you call the `id()` method of your `EntryPointClass` with `.`. The method accepts a **String** as argument.

    2. You can also use Dot Notation to do something called **Method Chaining**. It acts like a connector between different methods and functions that make them in one line, like a "chain" (you will see an example of this in this activity)


Hooray! We now know how to create and register an item. The only thing left is:

How to make them into one line?

Notice that the `register` method accepts an argument `ItemObject`. We can actually instantiate the Item object here! So, in my case, it is possible to do something like:

```java
Registry.register(Registries.ITEM, IceCream.id("ice_cream_ingot"), new Item(new Item.Settings()));

//Don't worry about what Item.Settings() mean here right now;
//but you should know that Item.Settings() acts as the argument that the Constructor of Item class accepts
```

Obviously, this is one line of code. However, it is very long and hard to read.

Imagine you have to do this for every item in the future...This is not effective. Is there a way to organize this code into a clearer way for repetitive use?

If you remember the purposes of functions (methods), they are created for **readibility** and **repetitive use**. You will definitely not want to do a bunch of code every time you create a new item for your mod. Therefore, why not create a **method** for your ModItems class?

And each time you want to create a new item, just call (use) this function. This would also just be one line of code, but more likely readable.

!!! task "Create the `register` method"
    Add the following `register` method inside your `ModItems` class:

    ```java
    private static Item register(String name, Item item) {

        return Registry.register(Registries.ITEM, <EntryPointClass>.id(name), item);

    }
    ```

What each component do:

- `private` : means that this method is accessible only in this class (other code cannot use this method)
- `static` : means that this method belongs to the Class rather than the Objects of this class, so you can call the method using the Class name
- `Item` : The *return* type of this function (method).
> "return" means what does this function output.
- `register` : the name of this function (method)
- `String name` : You want the 1st argument to be a `String`;`name` is the parameter, which is used to store the 1st argument; you can use it inside the function like a variable
- `Item item`: You want the 2nd argument to be an `Item` object; `item` is the parameter name, which is used to store the 2nd argument; you can use it inside the function like a variable
- `EntryPointClass` : Your entry-point class! This is already generated by the template. It's usually generated based on your **Mod Name** without spaces! See yours on the left panel under `src/main/java/modpackagename/` 
- `{}` : determine where the code of this function should be in
- `return`: the key word you use to output a value. In this case, you return a registered object, which is returned by the `register` method of `Registry`
> In math, we have functions with outputs and inputs, such as f(x) = x, h(x) = x+3, y = x + 9, etc. The code after *return* is the output, the y value of the function; The arguments are like the input, the x values of the function.

If you notice something interesting here, we are actually creating a method that uses another method from another class. That is doable, and in this case it is doable because you've imported Registry, and the `register` method itself is `public`.

!!! warning
    You might notice there are two `register` here. However, the register in `Registry.register` is not the register method you define! That register is a method of the `Registry` class, and it returns the registered Item object.

    You might feel confused with the same naming, but Java knows which register is being called because it analyzes the class/object that calls the method. For example, if you want to call your `ModItems` class's register method in **other classes**, you would so something similar like: `ModItems.register(...)`

    You would see many methods named `register`, be careful to distinguish between them!!!


!!! tip
    A useful tip to distinguish between different register methods: pay attention to **WHAT** calls the method. Is it `ModItems.register(...)`? Or `Registry.register(...)`? Or more complex in a chain with dot notation: `AAA(...).BBB(...).CCC(...).register(...)`?

In my case, the code would look like this:
```java
private static Item register(String name, Item item) {

    return Registry.register(Registries.ITEM, IceCream.id(name), item);

}

//because my Entry-Point Class is named "IceCream"; 
//see yours on the left panel under src/main/java/modpackagename/
//it is usually generated by the template based on your Mod Name without spaces
```

Now you have the method!!! We can finally start to create and register the item.

HOWEVER, we need to create a holder, which is a variable, that holds it. Remember that `ModItems` is an **Organizer Class**. If you have to use your created item in the future, you can refer to the item by using the variable!

!!! task "Create the item variable"
    Assign the item to a variable—an attribute of `ModItems`—using the method you defined. Place this code inside the `ModItems` class, either above or below the method:

    ```java
    public static final Item <ITEM_VAR_NAME> = register(<String item_path>, new Item(new Item.Settings()));
    ```

What each component mean:

- `public` : keyword; means that this variable is accessible in other classes (other code can use this variable)
- `static` : keyword; means this variable belongs to the class, which is an **Attribute** (a more technical term is `field`)
- `final` : keyword; means that this variable can only be assigned once!
> suppose you have a variable `x`; if `x` is not `final`, you can assign different values to it after its first assign:
```java
int x = 1; //now x is 1
int x = 2; //now x is 2
int x = 3; //now x is 3
```
> the reason you use `final` is because you know that this variable would, and should only refer to the exact Item object you assign to it.
- `Item` : the type of variable, which matches what you are assigning to the variable
> If you want to assign an integer to a variable named x, it would be something like:
```java
int x = 1;
```
- `ITEM_VAR_NAME` : The name you want this variable to be; the naming follows the [**Constant Convention**](../01-introduction/02-java.md#java-convention)
- `=` : the assign operator
- `register(...)` : you call the method that you just defined! It returns the Item object. Since they are in the same `ModItems` class, you don't need to use dot notation.
- `<String item_path>` : The path of your item, which would be part of your item's ID; It needs to be a **String**; the naming follows the [**Minecraft Item ID Convention**](../01-introduction/02-java.md#java-convention)
!!!concept "Item ID"
    - A Minecraft Diamond has an ID that looks like this: `minecraft:diamond_ore`. For mods, it follows the format `mod-id:item_path`.

    - My mod ID is `ice-cream`, and if my `item_path` is `ice_cream_ingot`, my item's ID would be `ice-cream:ice_cream_ingot`.

    - In Minecraft, you can use commands to give you items with their IDs!!!
- `new Item.Settings()` : this creates an object of the `Item.Settings` class, which is the `Setting` class in the `Item` class, using the standard format of instantiating an object
> This is a perfect example of nested classes; `Item` class is the top-level class, so it can have sub classes like `Setting`. A Setting Object contains all the configurations, or sets of attributes, that is needed for an `Item` object. So you don't have to do listing like parameter1, parameter2, etc.

My code would be like this:
```java
public static final Item ICE_CREAM_INGOT = register("ice_cream_ingot", new Item(new Item.Settings()));
```

So far, you should have a structure similar to this in your ModItems file (below is my code):
```java
package com.ygledc.icecream;

import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;

public class ModItems {

    public static final Item ICE_CREAM_INGOT = register("ice_cream_ingot",
            new Item(new Item.Settings()));

    //I just enter a new line here for easier viewing; keeping them in one line is fine


    private static Item register(String name, Item item) {

        return Registry.register(Registries.ITEM, IceCream.id(name), item);

    }

}
```

Nice job!

## 3. Add Item To Creative Inventory

You've created and registered your items. It is good news to know that Minecraft now can recognize our item. But, the new problem is:

How can players access the item?

For Act 1, we will only focus on how to access the item through the Minecraft's Creative Inventory, which means, we are now learning how to add our registered item to Minecraft's inventory!

### Import Classes 02

Same, if we want to access Minecraft's inventory, we need **methods to access it** and **the Minecraft's Creative Inventory**. We will do something similar to [Import Classes 01](#import-classes-01).

!!! task "Import the creative inventory classes"
    Import these two classes below the package declaration:

    ```java
    import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
    import net.minecraft.item.ItemGroups;
    ```

What each class can offer:

- ItemGroupEvents Class : this class contains methods to add fabric mod items to the creative inventory

- ItemGroups : this class contains the existing Minecraft Inventory in groups, represented as **Attributes** (fields), such as: ItemGroups.INGREDIENTS, ItemGroups.TOOLS, etc. These attributes represent the different inventory tabs you see in Minecraft!

### Add to Inventory

`ItemGroupsEvent` class has a `static` (belongs to the class) method named `modifyEntriesEvent`. Below is the implementation of the method that adds your item to the **Ingredients Tab** in creative inventory:

```java
ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS).register(entries -> {entries.add(<ITEM_NAME>);});

//probably too long to fit your screen

ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
        .register(entries -> {
            entries.add(<ITEM_NAME>);
        });

//This is the same, but looks more organized; you just make a new line.


ItemGroupEvents.modifyEntriesEvent(ItemGroups.<INVENTORY_TAB/GROUP>)
        .register(entries -> {
            entries.add(<ITEM_NAME1>);
            entries.add(<ITEM_NAME2>);
            ...
        });

//If you are interested, this is the general form for adding multiple items to ItemGroups.<INVENTORY_TAB/GROUP>;
//in this case, ItemGroups.<INVENTORY_TAB/GROUP> would be ItemGroups.INGREDIENTS
```
> This is an example of **Method Chaining** using Dot Notation!

What each component mean:

- `ItemGroupEvents` : the class we have imported

- `modifyEntriesEvent(...)` : the static method in `ItemGroupEvents`

- `ItemGroups.INGREDIENTS` : The attribute (variable) `INGREDIENTS` in `ItemGroup` class. It represents the Ingredients tab in the creative inventory. Here, it serves as an argument of the method `modifyEntriesEvent(...)`

- `register(...)` : a method also named *register* that is called by an **Event Object**; this object is returned by the method `modifyEntriesEvent(...)`, so we use dot notation to call its `register` method

- `entries -> entries.add(...)`: this is a **Lambda Expression**, a shortcut to create an anonymous function. You don't need to know lambda expression or anonymous function now. The logic behind this code is kind of complex. You only need to know that it serves as the argument for the `register(...)` method! You pass in the name of your item's variable (e.g., `ICE_CREAM_INGOT`) inside `...` to add the item to the creative inventory in Ingredients tab.

- `ITEM_NAME` : The variable that is previously declared to represent the Item you create.

After having the code, we should now consider putting it inside a method.

However, this method is for making your item appear in the creative inventory. It is for all your items! And if you look at the general form, you will notice that it would expand as you have more items.

So, this method is not for a specific item or object. It should be some type of code that runs when `ModItems` is initialized.

To do that, you can simply use the key word `static` to make it belong to the class `ModItems`, then when Minecraft is launched and `ModItems` is initialized, you can successfully declare your Item object, register it to Minecraft, and register it to the inventory!

But here, we are not going to use that `static`. Let's have a look at a new issue:

In order to load your Item, you would need to initialize your `ModItems` class, because `ModItems` would not run by its own.

We need to create a method that makes Java run `ModItems` by calling this method outsite of `ModItems`.

This initialization of `ModItems` is done by calling its method inside our **entry-point class**. If you remember, this pre-generated **entry-point class** is like the front door of your mod, the "entry point".

Java would then load `ModItems`, which create and register your items.

Note that this method doesn't have to actually do something. It is just for Java to load `ModItems`.

If so, why not utilize it? We can actually put the two methods into one! It would not only successfully add all your items to the inventory, but also load `ModItems`. Wouldn't that kill two birds with one stone?

!!! task "Create the initializer method"
    Create a method that tells Java to load `ModItems` and adds all items to the inventory:

    ```java
    public static void initialize() {
        ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
                .register(entries -> {
                    entries.add(<ITEM_NAME>);
                });
    }
    ```

what some components mean:

- `public` : method is accessible in other classes

- `static` : method belongs to the class

- `void` : the return type; `void` means return nothing, since the purpose of this function is not to return anything

- `initialize` : the name of this method; later used to call this method in the **entry-point class**

- `ItemGroups.INGREDIENTS` : It represents the Ingredients tab in the creative inventory.

- `ITEM_NAME` : the previous declared reference variable of your item

> description of components would become more simple and concise since we want to avoid repetitive contents. You are expected to learn them as you complete the activities, but don't worry. You can always go to [Dictionary](../04-dictionary/index.md) to review them.

In my code, I would do something like this:

```java
public static void initialize() {
    ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
            .register(entries -> {
                entries.add(ICE_CREAM_INGOT);
            });
}
```

That is all the code for `ModItems`!!!

You should have something similar to this in your `ModItems`:

```java
package com.ygledc.icecream;

import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;

import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents;
import net.minecraft.item.ItemGroups;

public class ModItems {

    public static final Item ICE_CREAM_INGOT = register("ice_cream_ingot",
            new Item(new Item.Settings()));


    private static Item register(String name, Item item){
        return Registry.register(Registries.ITEM, IceCream.id(name), item);
    }

    public static void initialize() {
        ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)
            .register(entries -> {
                entries.add(ICE_CREAM_INGOT);
            });
    }

}
```
## 4. Load ModItems

We will now call the method `initialize` in the **entry-point class** to load `ModItems`.

> How it works?

> Java loads the whole `ModItems` class when calling its methods. It would tell Java to load all contents of `ModItems`, helping us run the code we wrote in `ModItems` that creates the item.

!!! task "Open the entry-point class"
    Open your entry-point class. It is usually generated inside `src/main/java/modpackagename/`, next to `ModItems` and `mixin`.

> My Mod Name is Ice Cream, so my entry-point class name is called `IceCream`.

You can see some pre-written code here. You can also see your MOD-ID in this file!

You do not need to understand what each of these code mean. For now:

!!! task "Call `ModItems.initialize()`"
    Inside `public void onInitialize()`, above `LOGGER.info("Hello Fabric world!");`, add:

    ```java
    ModItems.initialize();
    ```

We use dot notation to call the `initialize()` method of `ModItems` inside another class! This would load our `ModItems`, which would create our items, register them, and add them to the inventory.

Here, in easy words, `onInitialize()` is a special and required method of our entry-point class (top-level) that Fabric calls when your mod is being initialized. Its purpose is to start your mod’s setup code, for exapmle, putting `ModItems.initialize()` inside.

> `onInitialize()` is not arbitrary! It is something required by fabric.

The LOGGER code below is just a tool for printing messages to the console.

That's all you need to do! Do not modify other existing code in this file. You should have something similar to this in your entry-point class:
```java
package com.ygledc.icecream;

import net.fabricmc.api.ModInitializer;

import net.minecraft.util.Identifier;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class IceCream implements ModInitializer {
    public static final String MOD_ID = "ice-cream";

    // This logger is used to write text to the console and the log file.
    // It is considered best practice to use your mod id as the logger's name.
    // That way, it's clear which mod wrote info, warnings, and errors.
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {
        // This code runs as soon as Minecraft is in a mod-load-ready state.
        // However, some things (like resources) may still be uninitialized.
        // Proceed with mild caution.

        ModItems.initialize();

        LOGGER.info("Hello Fabric world!");
    }

    public static Identifier id(String path) {
        return Identifier.of(MOD_ID, path);
    }
}
```
> all imports here may be shown as `import ...` in IntelliJ

> clicking the `...` will expand them to what you see here


## 5. Checkpoint and Test 01

Make sure you've completed all code before!

We will create a checkpoint of our work by running a **gradle** command.

This is important in Mod Development. This command can ensure that all your code so far can be successfully built into an actual mod! In larger projects, checkpoints are needed frequently.

!!! task "Build your mod"
    Click the Terminal icon in the bottom-left corner. It looks like a box containing `>_`.

    After openning the terminal window, enter the following command and press Enter:

    ```text
    ./gradlew build
    ```

There are many ways to open a terminal, but make sure it is openned at your folder!!! For example, if you are using MacOS, you should see something like this in your terminal:
```text
YourDeviceName xxx-xxx-template-1.21.1 %
```

After running the command, wait a few seconds. It should say <mark class="highlight-green">BUILD SUCCESSFUL</mark>.

What `./gradlew build` does:

- compile your Java code by using your assigned JDK (Gradle JVM)

- check for errors

- process resources (we will add resources later)

- create the `.jar` file, which is the mod's file you download from online

Now, after a successful build, we will run a temporary Minecraft to test our mod.

!!! task "Run the Minecraft client"
    Open the Terminal from the bottom-left corner. Enter the following command and press Enter:

    ```text
    ./gradlew runClient
    ```

This command would launch a temporary Minecraft (a Minecraft development client) with your mod.

!!! task "Check the unfinished item in Minecraft"
    Create a new world in **Creative Mode**. Open your inventory and look in the Ingredients tab for a black-and-purple missing-texture item. You can also search for:

    ```text
    item.<mod-id>.<item_path>
    ```

    > your Mod ID and item's path

You should be able to see your item but in a black-and-purple missing texture pattern, since we haven't add any resources.

## 5. Add Resources

Now we will work on the resources for your item!

In Minecraft, we typically need these 3 basic resources:

1. The Displayed Text Name of your item in a specific language
2. The Texture of your item
3. The Model of your item

### Language JSON

!!! task "Create the `lang` directory"
    Create a directory named `lang` inside `src/main/resources/assets/<mod-id>/`. Select your mod ID directory, click the `+` icon, and select `Directory`.

    > `lang` represents language, this is how fabric recognize your language directory.

!!! task "Create `en_us.json`"
    Inside the `lang` directory, create a file named `en_us.json`.

    > `en_us` stands for English, which is the English name of your item when playing Minecraft in English.

    > You can do that for other languages as well! For example: `zh_cn.json` is for Simplified Chinese.

New concept here!
!!! concept "JSON"
    **JSON** (JavaScript Object Notation)

    Provides the data for your mod's items that Minecraft reads.

    Data are stored in **key-value pairs** using the format `"key": value`, similar to entries in a dictionary. A JSON **object** is the complete structure enclosed by curly braces `{ }`, and it can contain zero, one, or many key-value pairs.

    These are configuration, not executable code.

    You will get more familiar with it as you complete the activities.

!!! task "Add the item's English name"
    Inside `en_us.json`, add the displayed English name for your item using this structure:

    ```json
    {
        "item.<mod-id>.<item_path>": "<Name of Item That You Want to Appear In English Language>"
    }
    ```

What some components mean:

- `item` : tells Minecraft that you are naming an item.

- `mod-id` : your Mod ID.

- `item_path` : your item's path.

Here is mine:
```json
{
    "item.ice-cream.ice_cream_ingot": "Ice Cream Ingot"
}
```

### Models JSON

!!! task "Create the `models` directory"
    Create a directory named `models` inside `src/main/resources/assets/<mod-id>/`. Select your mod ID directory, click the `+` icon, and select `Directory`.

    > the naming `model` here is how Minecraft recognizes your json files for models.

!!! task "Create the model's `item` directory"
    Create a directory named `item` inside `src/main/resources/assets/<mod-id>/models/`. Select the `models` directory, click the `+` icon, and select `Directory`.

!!! task "Create the item model file"
    Inside this `item` directory, create `<item_path>.json` using your item's path. My file is:

    ```txt
    ice_cream_ingot.json
    ```
!!! task "Define the item model"
    Inside `<item_path>.json`, add the following item model:

    ```json
    {
        "parent": "minecraft:item/generated",
        "textures": {
            "layer0": "<mod-id>:item/<item_path>"
        }
    }
    ```

What some components mean:

- `"parent"` : the key; tells Minecraft which model this item's model is based on
- `"minecraft:item/generated"` : the value; refers to the existing model for items in Minecraft
- `"textures"` : the key; tells Minecraft what texture you want to apply to the model
- `"layer0"` : a key inside the nested object that is the value of `"textures"`; it refers to the first/main layer of the item model, since a regular item only needs `layer0`
- `"<mod-id>:item/<item_path>"` : the value; tells Minecraft which item you are applying the texture to, and the texture (png file) is located in `src/main/resources/assets/mod-id/textures/item/`
> We will create the `textures/item` directory level later!

Here is mine:
```json
{
    "parent": "minecraft:item/generated",
    "textures": {
        "layer0": "ice-cream:item/ice_cream_ingot"
    }
}
```

### Textures PNG

!!! task "Create the `textures` directory"
    Create a directory named `textures` inside `src/main/resources/assets/<mod-id>/`. Select your mod ID directory, click the `+` icon, and select `Directory`.

    > the naming `textures` here is how Minecraft recognizes your png files for textures.

!!! task "Create the texture's `item` directory"
    Create a directory named `item` inside `src/main/resources/assets/<mod-id>/textures/`. Select the `textures` directory, click the `+` icon, and select `Directory`.

!!! task "Add the item texture"
    Add your texture PNG file to this `item` directory. This image is how the item will appear in Minecraft.

    > There are many ways to add the png file, such as drag and drop. You can also do that by right clicking `item` (textures/item) and choose *Open/Reveal In Finder/Folder*, and put your png file inside the `item` directory.

> Act 1 uses Rosa's Ice Cream Ingot texture `act1.png`: [Download the art resource](../assets/resource/Ice_Cream_Resource_Pack.zip)

!!! task "Rename the texture file"
    In IntelliJ, find the PNG file inside `.../textures/item`. Right-click it, select `Rename`, and rename it to:

    ```txt
    <item_path>.png
    ```
    > this should be your item's path

Here is my naming:
```txt
ice_cream_ingot.png
```

We rename it to our item's path so that the code in our item's model JSON file can find its corresponding texture.

## 6. Checkpoint and Test 02

Make sure you've completed all code before!

We will create a checkpoint of our work by running a **gradle** command.

This is important in Mod Development. This command can ensure that all your code so far can be successfully built into an actual mod! In larger projects, checkpoints are needed frequently.

!!! task "Build your completed item"
    Open the Terminal from the bottom-left corner. Enter the following command and press Enter:

    ```text
    ./gradlew build
    ```
There are many ways to open a terminal, but make sure it is openned at your folder!!! for example (mac), you should see something like this in your terminal:
```text
YourDeviceName xxx-xxx-template-1.21.1 %
```

After running the command, wait a few seconds. It should say <mark class="highlight-green">`BUILD SUCCESSFUL`</mark>.

What `./gradlew build` does:

- compile your Java code by using your assigned JDK (Gradle JVM)

- check for errors

- process resources (we will add resources later)

- create the `.jar` file, which is the mod's file you download from online

Now, after a successful build, we will run a temporary Minecraft to test our mod.

!!! task "Run and test your completed item"
    Open the Terminal from the bottom-left corner. Enter the following command and press Enter:

    ```text
    ./gradlew runClient
    ```

This command would launch a temporary Minecraft (a Minecraft development client) with your mod.

!!! task "Verify the completed item"
    Create a new world—or enter the world from **Checkpoint and Test 01**—in **Creative Mode**. Open your inventory and search for your item's name. You should now see the completed item with its model and texture.

![demo1](../assets/images/activities/act-1/finish_act1_1.png "demo1"){ width="425" }
![demo2](../assets/images/activities/act-1/finish_act1_2.png "demo2"){ width="425" }

## Mermaid Workflow

A mermaid visualization for the general workflow.

```mermaid
flowchart TB
    A([Act 1]) --> B[1. Set up the project]
    B --> C[2. Create and register the item]
    C --> D[3. Add the item to the creative inventory]
    D --> E[4. Load ModItems]
    E --> F[5. Build and test the code]
    F --> G{Build successful?}
    G -- No --> H[Fix the reported errors]
    H --> F
    G -- Yes --> I[6. Add the item resources]
    I --> J[7. Build and test the completed item]
    J --> K([Act 1 complete])
```

---

Nice!

That is all for Act1.

You can check [Dictionary](../04-dictionary/index.md) to search and review for any important concepts or definitions.

!!! warning
    Do NOT delete your work for Act 1. Activities are designed to develop a full mod with multiple elements, so most activities in the future are based on the previous one.

    It is recommended to make a copy as backup, and one way is to use GitHub.
