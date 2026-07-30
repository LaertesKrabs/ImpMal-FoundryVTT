let forbidden = this.actor.system.findSpecialisation("tech", "Forbidden");
if (args.skill == "tech" && forbidden && !args.context.burdenOfKnowledge)
{
  args.context.burdenOfKnowledge = true;
  let value = await ValueDialog.create({title: this.effect.name, text: `<p>Gain Corruption to add Forbidden Advances? (+${5 * forbidden.system.advances} per Corruption)</p><p>Rolled ${args.result.roll} vs ${args.result.target} for ${args.result.SL} SL</p>`}, 0);
  if (value > 0)
  {

    this.actor.update({"system.corruption.value" : args.actor.system.corruption.value + Number(value)});

    this.script.notification(`Added ${value} Corruption`);
    
     args.data.modifier += forbidden.system.advances * 5 * value;
     args.data.target = args.computeTarget();
     args.context.text[this.item.id] = `${this.effect.name} (+${forbidden.system.advances * 5 * value})`;
     await args.evaluate();
  }
}