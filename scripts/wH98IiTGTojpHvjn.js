let target = Array.from(game.user.targets)[0];

if (!target)
{
  return this.script.notification("Target a Token to gain its Toughness Bonus in charges.")
}
else 
{
  let value = target?.actor.system.characteristics.tgh.bonus || 0;

  this.actor.setFlag("impmal", "motiveForceCurrent", this.actor.getFlag("impmal", "motiveForceCurrent") + value);

  this.script.message(`Gained ${value} Motive Force`);
  
}