if (!game.user.isGM)
{
  return this.script.notification("Must be GM perform this action", "error")
}

let boons = await Promise.all (["Item.4A33kVkOM0qxKuKp","Item.CywrmIWY8CpihrrH","Compendium.impmal-core.items.Item.ghppWF8AniiGGIdZ","Item.3TVkMHz74iBtb2DF","Item.aK3RkSt1LkplWY4d"].map(fromUuid))

let choice = await ItemDialog.create(boons.filter(b => !this.actor.items.getName(b.name)), 1, {text: "Select a Boon", title: this.effect.name})

this.actor.createEmbeddedDocuments("Item", choice)