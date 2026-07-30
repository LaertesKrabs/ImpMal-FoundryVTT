if (!game.user.isGM)
{
  return this.script.notification("Must be GM perform this action", "error")
}

let boons = await Promise.all (["Compendium.impmal-core.items.Item.b8WqelD5As2fEgH8","Item.ZZWMEJIZI9LzfC90","Item.CywrmIWY8CpihrrH","Compendium.impmal-core.items.Item.DPqoHh8SXw3l60tu","Item.OC2J0DrkuIZPaM9v"].map(fromUuid))

let choice = await ItemDialog.create(boons.filter(b => !this.actor.items.getName(b.name)), 1, {text: "Select a Boon", title: this.effect.name})

this.actor.createEmbeddedDocuments("Item", choice)