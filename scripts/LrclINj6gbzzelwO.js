let choice = await ItemDialog.create({advantage: "Advantage using sense", gain: "Gain Sense"}, 1, {text: "Select Effect", title: this.effect.name});
let sense = await ValueDialog.create({text: "Enter Sense", title: this.effect.name});

if (choice[0].id == "advantage")
{
  let effect = this.item.effects.get("bw7OYTKB3yYM2ZDF");
  effect.updateSource({name: effect.setSpecifier(sense), "system.transferData.type" : "document"});
}
else if (choice[0].id == "gain")
{
    let effect = this.item.effects.get("puPigl4EyYl6vpTW");
  effect.updateSource({name: `Gain ${sense}`, "system.transferData.type" : "document"});
}