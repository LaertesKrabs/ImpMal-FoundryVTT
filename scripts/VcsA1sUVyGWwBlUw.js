this.item.update(await this.effect.createAndEquipSlot({
    "name": "Mechadendrite Attack",
    "type": "weapon",
    "system": {
        "encumbrance": {
            "value": 0
        },
        "quantity": 1,
        "damage": {
            "base": "4",
            "characteristic": "str"
        },
        "attackType": "melee",
        "spec": "oneHanded"
    }
}));