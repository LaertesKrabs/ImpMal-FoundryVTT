let handler;
if (game.user.targets.size)
{
  handler =  Array.from(game.user.targets)[0].actor;
}
else
{
  handler = await DragDialog.create({title: this.effect.name, text: "Provide Handler for " + this.actor.name, filter: (actor) => actor.documentName == "Actor"})
}
if (handler)
{ 
  this.actor.setFlag("impmal", "handler", handler.uuid);
  this.item.update({name: this.item.setSpecifier(handler.name)});
}