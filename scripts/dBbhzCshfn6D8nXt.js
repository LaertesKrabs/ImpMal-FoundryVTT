if (args.type == "weapon" && args.system.isEquipped && args.system.traits.has("secretsOfMars"))
{
  args.system.skillOverride.value = "tech";
}