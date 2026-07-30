if (this.actor.inCombat && args.type == "effect" && args.options.action == "create" && ["bleeding"].some(i => args.document.statuses.has(i)))
{
  args.document.setFlag("impmal", "round", game.combat.round);
}