if (args.woundsGained && !(args.critical || args.opposed?.attackerTest?.result.critical))
{
  args.actor.addCondition("restrained");
}
else if ((args.critical || args.opposed?.attackerTest?.result.critical))
{
  args.actor.addCondition("restrained", "major");
}