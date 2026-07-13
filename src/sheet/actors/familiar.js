import NPCSheet from "./npc"

export class FamiliarSheet extends NPCSheet
{

    static DEFAULT_OPTIONS = {
        classes : ["familiar"]
    }

      
      static PARTS = {
        header : {scrollable: [""], classes : ["npc-header"], template : 'systems/impmal/templates/actor/familiar/familiar-header.hbs' },
        tabs: { scrollable: [""], template: 'templates/generic/tab-navigation.hbs' },
        main: { scrollable: [""], template: 'systems/impmal/templates/actor/npc/npc-main.hbs' },
        skills: { scrollable: [".sheet-list.skills .list-content"], template: 'systems/impmal/templates/actor/tabs/actor-skills.hbs' },
        powers: { scrollable: [""], template: 'systems/impmal/templates/actor/tabs/actor-powers.hbs' },
        effects: { scrollable: [""], template: 'systems/impmal/templates/actor/tabs/actor-effects.hbs' },
        notes: { scrollable: [""], template: 'systems/impmal/templates/actor/npc/npc-notes.hbs' },
      }

}