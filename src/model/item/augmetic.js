import { EquipSlots } from "./components/equip-slots";
import { EquippableItemModel } from "./components/equippable";
import { TraitListModel } from "./components/traits";
import { ModListModel } from "./modification";
let fields = foundry.data.fields;

export class AugmeticModel extends EquippableItemModel
{
    static LOCALIZATION_PREFIXES = ["WH.Models.augmetic"];
    static defineSchema() 
    {
        let schema = super.defineSchema();
        schema.slots = new fields.EmbeddedDataField(EquipSlots);
        schema.traits = new fields.EmbeddedDataField(TraitListModel);
        schema.mods = new fields.EmbeddedDataField(ModListModel);
        schema.augmeticCost = new fields.NumberField({initial: 1});
        return schema;
    }

    computeBase() 
    {
        super.computeBase();
        this.traits.compute();
        this.mods.prepareMods(this.parent);
    }

    _addModelProperties()
    {
        if (this.parent.actor)
        {
            this.slots.relative = this.parent.actor.items;
            this.slots.list.forEach(i => i.relative = this.slots.relative);
        }
    }

    getOtherEffects()
    {
        return super.getOtherEffects()
        .concat((this.mods.documents || [])
            .reduce((prev, current) => prev.concat(current.effects.contents), []));
    }

    async toEmbed(config, options)
    {


        let html = `
            <h4>@UUID[${this.parent.uuid}]{${config.label || this.parent.name}}</h4>
            ${this.notes.player}
            ${game.user.isGM ? this.notes.gm : ""}
        `;


        let div = document.createElement("div");
        div.style = config.style;
        div.innerHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(html, {relativeTo : this.parent, async: true, secrets : options.secrets});
        return div;
    }

}