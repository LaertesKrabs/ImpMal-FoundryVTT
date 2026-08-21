if (this.item.getFlag("impmal", "mode") == "whip" && args.woundsGained > 0)
{
  args.actor.addCondition("stunned");
}