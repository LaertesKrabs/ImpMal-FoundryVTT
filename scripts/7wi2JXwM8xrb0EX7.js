if (!args.vehicle)
{
    if (await this.script.dialog(`Gain bonus damage and ignore AP? (${args.actor.name})`))
    {
        args.ignoreAP = true;
        args.modifiers.push({label: this.effect.name, value: args.opposed.attackerTest.result.SL});
    }
}
else 
{
  args.ignoreAP = true;
  args.modifiers.push({label: this.effect.name, value: args.opposed.attackerTest.result.SL});
}