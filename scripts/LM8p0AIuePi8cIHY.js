let value = await ValueDialog.create({text: "Spend Motive Force", title: this.effect.name});
value = Math.clamp(value, 0, this.actor.getFlag("impmal", "motiveForceCurrent") || 0);
if (value) 
{
    this.actor.spend("flags.impmal.motiveForceCurrent", value); 
    this.script.message(`Spent ${value} Motive Force`) ;
    args.fields.damage += value; 
}