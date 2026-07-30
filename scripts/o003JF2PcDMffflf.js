if (!game.user.isGM)
{
  return this.script.notification("Must be GM perform this action", "error")
}

let boons = await Promise.all (["Item.pCzV0rDtedvaLRj0","Compendium.impmal-core.items.Item.vIIVu2ZsvnPunpp3","Item.Hl49gVc7RX01NWDK","Compendium.impmal-core.items.Item.87FNdN6pEeNlJRT4","Item.Bw7hxvFKLlJ08EG9"].map(fromUuid))

let roll = await new Roll("1d10").roll()
roll.toMessage(this.script.getChatData())

choice = boons[Math.floor((roll.total-1)/2)]

if (this.actor.items.getName(choice.name))
{
this.script.notification(`<strong>${this.actor.name}</strong> already owns <strong>${choice.name}</strong>`, "error")
}
else 
{
this.script.message(`Added <strong>${choice.name}</strong>`, {whisper : ChatMessage.getWhisperRecipients("GM")})
this.actor.createEmbeddedDocuments("Item", [choice])
}