let effects = this.actor.effects.filter(e => e.getFlag("impmal", "drug"));
if (this.actor.hasCondition("poisoned"))
{
  effects.push(this.actor.hasCondition("poisoned"));
}
if (effects.length)
{
  await this.actor.deleteEmbeddedDocuments("ActiveEffect", effects.map(i => i.id));
  this.script.notification("Removing " + effects.map(i => i.name).join(", "));
}

let test = await this.actor.setupSkillTest({key: "fortitude", name: "Poison"}, {appendTitle: ` - ${this.effect.name}`});
if (test.failed)
{
  this.actor.addCondition('stunned');
  let roll = await new Roll("1d10").roll();
  roll.toMessage(this.script.getChatData({flavor: "Stunned Duration"}));
}