let xeno = await ValueDialog.create({text: "Choose Xenos Species", title: this.effect.name});

if (xeno)
{
  this.item.updateSource({name: this.item.setSpecifier(xeno)});
}