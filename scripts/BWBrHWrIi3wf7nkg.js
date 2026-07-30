if (!args.item.isOwned)
{
  return;
}

let mode = args.item.getFlag("impmal", "mode") || "staff";

args.item.name = args.item.setSpecifier(mode.capitalize());

switch(mode)
{
  case "staff": 
    	args.item.system.traits.add("defensive", {modify: true});
    break;
  case "whip":
      args.item.system.traits.add("reach", {modify: true});
      args.item.system.traits.add("inflict", {value: "Stunned", modify: true});
    break;
  case "ranged": 
    args.item.system.attackType = "ranged";
    args.item.system.category = "plasma";
    args.item.system.spec = "longGun";
    args.item.system.range = "long";
    args.item.system.damage.base = 10;
    args.item.system.mag.value = 12;
    args.item.system.damage.characteristic = "";
    args.item.system.traits.list = args.item.system.traits.list.concat([
    {
        "key": "loud"
    },
    {
        "key": "penetrating",
        "value": "6"
    },
    {
        "key": "supercharge",
        "value": "4"
    },
    {
        "key": "unstable"
    }
])
    break;

}