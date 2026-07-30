let charges = this.actor.getFlag("impmal", "motiveForceCurrent") || 0;
let improved = this.actor.statuses.has("improved-voltagheist-field");
if (charges)
{
  let value = await ValueDialog.create({text: `Spend Motive Force (+${improved ? 2 : 1} Armour per charge)?`, title: this.effect.name});
value = Math.clamp(value, 0, charges);
  if (value)
  {
    args.modifiers.push({label: this.effect.name, value: improved ? -(value * 2) : -value, armour: true});
    this.script.message(`Spent ${value} Motive Force`);
    this.actor.spend("flags.impmal.motiveForceCurrent", value);
  }
}