if (!game.user.isGM)
{
  return this.script.notification("Must be GM perform this action", "error")
}

let boons = await Promise.all (["Compendium.impmal-core.items.Item.8dh20TPTquoAZecl","Compendium.impmal-core.items.Item.V69YxMlVqjD4eHQK","Item.Hl49gVc7RX01NWDK","Compendium.impmal-core.items.Item.Rg69Ap4KU3SM8jHK","Compendium.impmal-core.items.Item.iwn1zakDuIxlipwl"].map(fromUuid))

let choice = await ItemDialog.create(boons.filter(b => !this.actor.items.getName(b.name)), 1, {text: "Select a Liability", title: this.effect.name})

this.actor.createEmbeddedDocuments("Item", choice)