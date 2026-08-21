if (args.type == "effect" && args.options.action == "create" && ["difficultTerrain"].some(i => args.document.statuses.has(i)))
{
  this.script.notification("Ignores " + args.document.name);
  return false;
}