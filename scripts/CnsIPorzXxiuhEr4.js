let effects = {
  gun: "ZvNyKnwKueCSGIqb",
  dissector: "vna9rpEaaUt7b9eI",
  injector: "tC3sjdPhVxkOOXX7"
}

let choice = await ItemDialog.create(ItemDialog.objectToArray({
  gun: "Gun-Skull",
  dissector: "Dissector-Skull",
  injector: "Injector-Skull"
}), 1, {title : this.effect.name, text : "Choose Skull"});

if (choice[0])
{
  this.item.updateSource({name: this.item.setSpecifier(choice[0].name)});
  this.item.effects.get(effects[choice[0].id]).updateSource({"system.transferData.type" : "document"});
}