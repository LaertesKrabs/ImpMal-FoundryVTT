let roll = await new Roll("1d10 + " + this.actor.system.characteristics.tgh.bonus).roll();
roll.toMessage(this.script.getChatData());
this.effect.updateSource({
  "flags.impmal.drug" : true,
  duration: {
    value: roll.total,
    units: "rounds"
  }});

if(this.actor.effects.find(e => e.getFlag("impmal", "drug")))
{
  this.actor.addCondition("poisoned");
}