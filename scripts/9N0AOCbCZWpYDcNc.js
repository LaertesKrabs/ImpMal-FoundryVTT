if (args.woundsGained)
{
  args.actor.addCondition("poisoned");
  this.script.message("Roll [[/r 1d10]] + Armour on target (if biological).")
}