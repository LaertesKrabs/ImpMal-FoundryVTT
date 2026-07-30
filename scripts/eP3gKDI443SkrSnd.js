if (args.opposed?.attackerTest?.item?.system.isRanged)
{
  let roll = await new Roll("1d10").roll();
  roll.toMessage(this.script.getChatData());
  args.modifiers.push({value: -1 * roll.total, label: this.effect.name})
}