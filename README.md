# Hatchlings

This goal of this script is to help you find hatchlings in your inventory that would becomes familiars you don't already have in your terrarium.
There are several flags that can be used when running this script to modify the behavior and what is used.

## Basic Usage

Install by using `git checkout Glitched94/hatchlings.git release`

At it's core, the most basic usage of this script is calling `hatchlings`. This command will print a table of all the usable familiar hatchlings in your inventory.

```
> hatchlings
```
![hatchlings example output](/docs/imgs/hatchlings.png)

## Using Hatchlings

- `hatchlings use` - Will use any familiar hatchlings in your inventory that aren't already in your terrarium

If you'd like to restrict the script to only use hatchlings valued below a certain threshold, you can either include `useLimit=10000` as part of the command, or set a value to `tptb.hatchlings.useLimit` by doing `set tptb.hatchlings.useLimit=10000`. The value is determined using Mafia's `retrievePrice` method. To disable the limit, set the value to `0`.

## Buying Hatchlings

Hatchlings includes a command to purchase all familiar hatchlings you haven't previously used below a configured price point. To set the maximum price to spend on acquiring a new hatchling, set the `tptb.hatchlings.priceLimit` property, like so `set tptb.hatchlings.buyLimit=50000`.
- `hatchlings buy` - Will search the mall for all familiar hatchlings priced below your `priceLimit` and purchase them. _Does not use the items purchased!_
- `hatchlings buy use` - Will purchase hatchlings like above then use them.

## Simulation

Automating the usage or purchase of items can be a scary concept. If you'd like to see what actions the script will perform before performing them, you can run any of the above commands and include `sim` to generate a text output of what would be performed.
- `hatchlings use sim` would generate an output like:
```
> hatchlings use sim

Found 1 familiar hatchlings in your inventory that you haven't hatched before...
Sim: Using 1 baby bark scorpion
```

- `hatchlings buy sim`
```
> hatchlings buy sim

Searching for "coffee sprite"...
Search complete.
Searching for "Cheshire Bitten"...
Search complete.
Searching for "Dark Jill-O-Lantern"...
Search complete.
Searching for "hand turkey outline"...
Search complete.
Searching for "crimbo elfling"...
Search complete.
Searching for "orphan baby yeti"...
Search complete.
Searching for "silk garter snake"...
Search complete.
Searching for "emo roe"...
Search complete.
Sim: Buying 1 Deactivated O. A. F. at 6,000,000
Sim: Buying 1 pile of loose snow at 6,000,000
Sim: Buying 1 BRICKO egg at 7,999,995
Sim: Buying 1 newborn kobold at 7,000,000
Sim: Buying 1 hot egg at 3,000,000
...
You'd spend 118,392,704 meat to get 46 new hatchlings
```

