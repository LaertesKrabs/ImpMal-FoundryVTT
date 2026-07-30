let bleeding = this.actor.hasCondition("bleeding");
if (bleeding && bleeding.getFlag("impmal", "round") < game.combat?.round)
{
  this.script.notification("Removed Bleeding");
  bleeding.delete();
}