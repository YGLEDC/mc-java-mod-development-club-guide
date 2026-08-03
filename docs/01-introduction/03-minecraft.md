# Minecraft

> Some basics about Minecraft

> If you are familiar with Minecraft, this page should be enjoyable!

## What is Minecraft
**Minecraft** (also called MC) is a 3d sandbox game, meaning players have a great degree of freedom to explore and build. It is a typical example of **Object Oriented Programming**. Notch created Minecraft with Java, a typical OOP language that builds this virtual 3d world!

You can explore the world, build houses, construct cities, raise livestock. It is creative, and it depends on what you want to do.

With that basic, mods even offer you more possibilities.

![Picture of Minecraft](../assets/images/introduction/minecraftImage-1.png "Minecraft"){ width="275" }
![Picture of Minecraft](../assets/images/introduction/minecraftImage-2.png "Minecraft Building"){ width="600" }

> image from [Minecraft](https://www.minecraft.net/en-us) and [哎呦你干嘛](https://www.ayngm.com/post/400.html)


## Minecraft is OOP!

Recall that **OOP** stands for **Object Oriented Programming**. Minecraft is a typical demonstration of that. You have players, blocks, mobs such as zombies, and items in Minecraft. Each of then is represented by a **Java Class**.

More specifically, a zombie has a health of 20, that is the **Attribute** of its class; a zombie attacks players, that is the **Method** of the class. An instance (object) of the class can use the method of the class, representing how a zombie in the zombie class can attack players. 

```java
Entity
├── LivingEntity
  ├── Player
  ├── Zombie
  ├── Cow
  └── Villager
```
> a bigger class contains small classes

## Minecraft Versions

Minecraft Java Edition has various game versions released in different times. Some golden versions for modding are *1.12.2*, *1.16.5*, *1.18.2*, *1.20.1*, etc.

Different versions require different JDKs to run Minecraft. We will guide you to set up the correct environment in **Setup**.

> 1.21.1 is a modern and rich version for fabric modding. Specifically, we will develop mods in Minecraft Java Fabric 1.21.1.

## Minecraft Launcher

When you buy Minecraft, you are buying a **Minecraft License** associted with your Microsoft Account. After your purchase, you will need a **Launcher** to run Minecraft.

**Launcher** is a platform to run Minecraft and manage your game versions, created worlds, mods, etc. 

Minecraft offers you the option to download their official launcher when you purchase Minecraft, or you can download it from their website. However, there are other launchers that you can use such as [Modrinth](https://modrinth.com/), [Curseforge](https://www.curseforge.com/), etc. 

Personally, I recommend [Prism Launcher](https://prismlauncher.org/) due to its customization capabilities.

> More info in **Setup** : [Minecraft & Launcher](../02-setup/01-minecraft-launcher.md)

## Fabric

**Fabric** is a loader that contains the tools for you to develop mods. It is modern, efficient, and light-weighted.

For now, you just need to know that it is a mod loader. There are also other mod loaders such as **Forge** and **NeoForge**.


## Buy and Play Minecraft

It is highly recommended to spend $29.9 to purchase **Minecraft Standard Edition** [HERE](https://www.minecraft.net/en-us) for optimal development.

Although you don't need to buy Minecraft for initial mod development, you will eventually need to play it on a your own world.

> We recommend you to purchase Minecraft and get exposed to the game before we step into mod development. Follow [Minecraft & Launcher](../02-setup/01-minecraft-launcher.md) to purchase Minecraft and install launchers.

However, you can also choose to start develop mods because you can play a Minecraft demo with the development tools.

If this is the thing you want to do, it won't be too late to jump in then. 

 More info about downloading Minecraft is in the **Setup** Directory.
