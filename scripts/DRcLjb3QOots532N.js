if (!game.user.isGM)
{
  return this.script.notification("Must be GM perform this action", "error")
}

let boons = await Promise.all (["Item.4A33kVkOM0qxKuKp","Item.CywrmIWY8CpihrrH","Compendium.impmal-core.items.Item.ghppWF8AniiGGIdZ","Item.3TVkMHz74iBtb2DF","Item.aK3RkSt1LkplWY4d"].map(fromUuid))

let roll = await new Roll("1d10").roll()
roll.toMessage(this.script.getChatData())

choice = boons[Math.floor((roll.total-1)/2)]

if (this.actor.items.getName(choice.name))
{
this.script.notification(`<strong>${this.actor.name}</strong> already owns <strong>${choice.name}</strong>`, "error")
}
else 
{
this.script.message(`Added <strong>${choice.name}</strong>`)
this.actor.createEmbeddedDocuments("Item", [choice])
}