if (args.result.fumble && args.item.system.traits.has("unstable"))
{
  args.result.text.unstable = `<strong>${this.effect.name}</strong>: 8+ on the Fumble Table results in Self Destruction`;
}