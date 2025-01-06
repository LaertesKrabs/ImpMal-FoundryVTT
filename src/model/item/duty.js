import { ImpMalActor } from "../../document/actor";
import { ItemInfluenceModel } from "./components/influence";
import { DualItemModel } from "./dual";

export class DutyModel extends DualItemModel 
{
    static defineSchema() 
    {
        let fields = foundry.data.fields;
        // Patron Fields
        let schema = super.defineSchema();

        schema.faction = new fields.EmbeddedDataField(DeferredReferenceModel);
        schema.category = new fields.StringField({initial : "character"});
        mergeObject(schema.patron.fields, {
            boonTable : new fields.EmbeddedDataField(DeferredReferenceModel, {}, {parent : schema.patron, name : "boonTable"}),
            liabilityTable : new fields.EmbeddedDataField(DeferredReferenceModel, {}, {parent : schema.patron, name : "liabilityTable"}),
            boon : new fields.EmbeddedDataField(DeferredReferenceModel, {}, {parent : schema.patron, name : "boon"}),
            influence : new fields.EmbeddedDataField(ItemInfluenceModel, {}, {parent : schema.patron, name : "influence"}),
        });


        // Character Fields
        mergeObject(schema.character.fields, {
            equipment : new fields.EmbeddedDataField(DeferredReferenceListModel, {}, {parent : schema.character, name : "equipment"}),
            characteristics : new fields.ObjectField({}, {}, {parent : schema.character, name : "characteristics"}),
            skills : new fields.ObjectField({}, {}, {parent : schema.character, name : "skills"}),
            influence : new fields.EmbeddedDataField(ItemInfluenceModel, {}, {parent : schema.character, name : "influence"}),
            items : new fields.EmbeddedDataField(ChoiceModel, {}, {parent : schema.character, name : "items"}),
            solars : new fields.NumberField({min : 0}, {}, {parent : schema.character, name : "solars"}),
        });
        return schema;
    }

    async summaryData()
    {
        let data = await super.summaryData();
        data.details.item.faction = `${game.i18n.localize("IMPMAL.Faction")}: ${this.faction}`;
        return data;
    }

    async applyDutyTo(actor)
    {
        let data = actor.toObject();
        let items = [];
        for(let ch in this.character.characteristics)
        {
            if (this.character.characteristics[ch])
            {
                data.system.characteristics[ch].starting += this.character.characteristics[ch];
            }
        }

        for(let ch in this.character.skills)
        {
            if (this.character.skills[ch])
            {
                data.system.skills[ch].advances += this.character.skills[ch];
            }
        }


        for(let option of this.character.items.options)
        {
            if (option.type == "placeholder")
            {
                items.push({name : option.name, type : "equipment"});
            }
            else if (option.type == "item")
            {
                let item;
                if (option.idType == "id")
                {
                    item = await game.impmal.utility.findId(option.documentId);
                }
                else if (option.idType == "uuid")
                {
                    item = await fromUuid(option.documentId);
                }

                let data = item?.toObject() || {};

                mergeObject(data, option.diff);
                data.name = option.name;
                items.push(data);
            }
        }

        data.system.solars += this.character.solars;

        if (actor.type == "npc")
        {
            data.name = this.parent.name;
        }
        else if (actor.type == "character")
        {
            let temp = new ImpMalActor(data);
            temp.prepareData();
            let expSpent = temp.system.xp.spent;
            data.system.xp.other.list.push({description : this.parent.name, xp : -1 * expSpent});
            for(let item of items)
            {
                delete item._id;
                if (item.type =="talent")
                {
                    item.system.xpCost = 0;
                }
            }
        }
        await actor.update(data);
        await actor.createEmbeddedDocuments("Item", items, {skipRequirement : true});
        ui.notifications.notify(game.i18n.format("IMPMAL.DutyApplied", {name : this.parent.name}));
    }

    async allowCreation(data, options, user)
    {
        let allowed = await super.allowCreation(data, options, user);

        if (this.category == this.parent.actor?.type || (this.category == "character" && this.parent.actor?.type == "npc")) // can add character duties to npcs for quick stats
        {
            if (this.category == "character")
            {
                let apply = await Dialog.confirm({title : game.i18n.localize("IMPMAL.ApplyDuty"), content : game.i18n.localize("IMPMAL.ApplyDutyContent")});
                if (apply)
                {
                    this.applyDutyTo(this.parent?.actor);
                }
                allowed = false;
            }
        }
        else 
        {
            allowed = false;
            ui.notifications.error("IMPMAL.ErrorPatronDutyCharacter", {localize : true});
        }
        return allowed;
    }


}