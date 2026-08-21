let skills = {
    "Defuse" : "Compendium.impmal-core.items.Item.pCaL4N0VwOWCN736",
    "Human" : {
        "name": "Human",
        "id" : "human",
        "type": "specialisation",
        "img": "modules/impmal-core/assets/icons/generic.webp",
        "system": {
            "advances": 0,
            "skill": "intuition"
        }
    },
    "High Gothic" : "Compendium.impmal-core.items.Item.uIycnZ1DuUJFFO0c",
    "Sector" : "Compendium.impmal-core.items.Item.BRM3Kr2h6HXY1N3S",
    "Kin" : {
        "name": "Kin",
        "id" : "kin",
        "type": "specialisation",
        "img": "modules/impmal-core/assets/icons/generic.webp",
        "system": {
            "skill": "medicae"
        }
    },
    "Tracking" : "Compendium.impmal-core.items.Item.6XPljxGYZGUiF0Ku",
    "Minor Voidship" : "Compendium.impmal-core.items.Item.uJDozJSZZWyPfvXy",
    "Haggle" : "Compendium.impmal-core.items.Item.NfZSZJjCzZRkR9Ux",
    "Move Silently" : "Compendium.impmal-core.items.Item.b3u4RvLc4hMpqvUZ",
    "Engineering" : "Compendium.impmal-core.items.Item.Fg5EIrACH7YL8GV4",
    "Security" : "Compendium.impmal-core.items.Item.4AB9VMouQfamftYY"
}

let advances = {
    "Defuse" : 0,
    "Human" : 2,
    "High Gothic" : 2,
    "Sector" : 2,
    "Kin" : 2,
    "Tracking" : 2,
    "Minor Voidship" : 2,
    "Haggle" : 2,
    "Move Silently" : 2,
    "Engineering" : 2, 
    "Security" : 2
}

let items = await Promise.all(Object.values(skills).map(async i => {
    let data;
    if (typeof i == "string")
    {
        data = (await fromUuid(i))?.toObject();
    }
    else 
    {
        data = i;
    }

    data.system.advances = advances[data.name];
    return data;
}));

let choice = await ItemDialog.create(items, 2, {title: this.effect.name, text: "Choose 2 Skills"});

if (choice.length)
{
    this.actor.createEmbeddedDocuments("Item", choice);
}