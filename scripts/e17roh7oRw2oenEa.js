if (!game.user.isGM)
{
  return this.script.notification("Must be GM perform this action", "error")
}

let boons = await Promise.all (["Compendium.impmal-core.items.Item.mMl55XQ1iBQhrqRj","Item.Pma4n2Zyv1xEBY4y","Item.5m1ZwNbwBJTX1JYF","Compendium.impmal-core.items.Item.yw68k1qdBS2eVi6f","Compendium.impmal-core.items.Item.aKUb1Ces1eXXDUo3"].map(fromUuid))

let choice = await ItemDialog.create(boons.filter(b => !this.actor.items.getName(b.name)), 1, {text: "Select a Liability", title: this.effect.name})

this.actor.createEmbeddedDocuments("Item", choice)