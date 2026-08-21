if (args.woundsGained > 0 && args.opposedTest.attackerTest?.context.suppression)
{
  args.actor.addCondition("restrained");
}