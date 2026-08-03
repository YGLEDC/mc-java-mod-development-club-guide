# Act 1: Item

> This activity is currently being planned.

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
