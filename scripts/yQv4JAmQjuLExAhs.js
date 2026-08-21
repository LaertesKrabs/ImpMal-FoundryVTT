if (!game.user.isGM)
{
  return this.script.notification("Must be GM perform this action", "error")
}

let boons = await Promise.all (["Item.pCzV0rDtedvaLRj0","Compendium.impmal-core.items.Item.vIIVu2ZsvnPunpp3","Item.Hl49gVc7RX01NWDK","Compendium.impmal-core.items.Item.87FNdN6pEeNlJRT4","Item.Bw7hxvFKLlJ08EG9"].map(fromUuid))

let choice = await ItemDialog.create(boons.filter(b => !this.actor.items.getName(b.name)), 1, {text: "Select a Liability", title: this.effect.name})

this.actor.createEmbeddedDocuments("Item", choice)