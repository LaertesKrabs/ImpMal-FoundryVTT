if (args.opposed && args.opposed.attackerTest.item?.system.isRanged)
{
    if (args.actor.statuses.has("lightCover"))
    {
      args.modifiers.push({value : 2, label : this.script.label, armour : true});
    }
    if (args.actor.statuses.has("mediumCover"))
    {
      args.modifiers.push({value : 4, label : this.script.label, armour : true});
    }
    if (args.actor.statuses.has("heavyCover"))
    {
      args.modifiers.push({value : 6, label : this.script.label, armour : true});
    }
}