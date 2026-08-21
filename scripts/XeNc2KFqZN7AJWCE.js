let item = await fromUuid("Compendium.impmal-core.items.Item.qQ8Y8nmiaTaKgzvs");

let knife = item.toObject();

knife.name = "Blade Implant";
knife.system.encumbrance = 0;
knife.system.traits.list = [{key : "subtle"}, {key : "penetrating", value: 2}]

this.item.update(await this.effect.createAndEquipSlot(knife));