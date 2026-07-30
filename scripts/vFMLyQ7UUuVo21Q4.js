if ((args.critical || args.opposed?.attackerTest?.result.critical))
{
  let roll = await new Roll("1d100").roll();
  roll.toMessage(this.script.getChatData());
  if (roll.total <= 20)
  {
    this.script.message("Injector Rig damaged! Poisoned for [[1d5]] rounds")
    this.actor.addCondition("poisoned", "major");
  }
}