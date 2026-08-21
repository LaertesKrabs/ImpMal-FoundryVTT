import IMItemSheet from "../item.js";

export default class AugmeticSheet extends IMItemSheet
{
    static type="augmetic"

    static DEFAULT_OPTIONS = {
      classes: [this.type],
    }
    
    static PARTS = {
      header : {scrollable: [""], template : 'systems/impmal/templates/item/item-header.hbs', classes: ["sheet-header"] },
      tabs: { scrollable: [""], template: 'templates/generic/tab-navigation.hbs' },
      description: { scrollable: [""], template: 'systems/impmal/templates/item/item-description.hbs' },
      details: { scrollable: [""], template: `systems/impmal/templates/item/types/${this.type}.hbs` },
      effects: { scrollable: [""], template: 'systems/impmal/templates/item/item-effects.hbs' },
    }

    async _onDropItem(data, ev)
    {
        let document = await Item.fromDropData(data);
        if (document.type == "modification" && document.system.type == "augmetic")
        {
          this.item.update(this.item.system.mods.add(document.toObject()));
        }
        else super._onDropItem(data, ev);
    }

}