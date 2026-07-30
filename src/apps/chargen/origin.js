import { ChargenStage } from "./stage";
export class OriginStage extends ChargenStage {
    journalId = "JournalEntry.rwldURPIV6B6iNBT.JournalEntryPage.fznKbHtkiCXchcDg"

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.resizable = true;
        options.width = 600;
        options.height = "auto";
        options.classes.push("origin");
        options.minimizable = true;
        options.dragDrop.push({dragSelector : ".list .list-item:not(.no-drag)"});
        options.title = game.i18n.localize("IMPMAL.CHARGEN.StageTitle.Origin");
        return options;
    }

    static get title() { return game.i18n.localize("IMPMAL.CHARGEN.StageTitle.Origin"); }

    constructor(...args) {
        super(...args);
        this.context.step = 0;
        this.context.origin = null;
        this.context.exp = 0;
        this.context.skills = {};

    }


    get template() {
        return "systems/impmal/templates/apps/chargen/origin.hbs";
    }

    async getData() {
        let data = await super.getData()
        if (this.context.origin)
        {
            data.originDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(this.context.origin.system.notes.player, {async : true})
            data.characteristics = this.context.origin.system.characteristics.choices.reduce((obj, ch) => {obj[ch] = game.impmal.config.characteristics[ch]; return obj}, {})
            data.skillChoice = this.context.skillChoice

            if (!data.skillChoice && this.context.origin.system.skills.list.length > 0)
            {
                data.showSkillChoice = true;
            }
        }
        return data
    }

    async _updateObject(event, formData) {
        this.data.items.origin = {
            item : this.context.origin,
            equipment : await Promise.all(this.context.origin.system.equipment.documents),
            talents : await Promise.all(this.context.origin.system.talents.documents),
        }
        if (formData.characteristic)
        {
            this.context.characteristic = formData.characteristic;
            this.data.choices.origin = formData.characteristic;
        }
        if (this.context.skillChoice)
        {
            let skills = this.context.skillChoice.list;
            skills.forEach(s => {
                    if (s.spec)
                    {
                        this.data.specialisations[s.uuid] = (this.data.specialisations[s.uuid] || 0) + 1;
                    }
                    else
                    {
                        this.data.skills[s.skill]++;
                    }
            })
        }
        this.data.exp.origin = this.context.exp;
        super._updateObject(event, formData)
    }

    activateListeners(html)
    {
        super.activateListeners(html);
        const dragDrop = new DragDrop({
            dropSelector: '.chargen-content',
            permissions: { drop: () => true },
            callbacks: { drop: this._onDrop.bind(this) },
          });

        dragDrop.bind(html[0]);
    }

    async _onDrop(ev)
    {
        let dragData = JSON.parse(ev.dataTransfer.getData("text/plain"));

        if (dragData.type == "Item") {
          let origin = await Item.implementation.fromDropData(dragData)
    
          if (origin.type != "origin")
            return
    
          this.context.step = 1;
          this.context.exp = 0;
          this.context.origin = origin
          this.updateMessage("Chosen", {chosen : origin.name})
        }
        this.render(true);
    }

    validate()
    {
        if (!this.context.origin)
        {
            this.showError("Origin")
            return false
        }
        if (!this.validateChoices())
        {
            this.activateChoiceAlerts();
            this.showError("Choices")
            return false;
        }
        return super.validate();
    }

    async rollOrigin(event) {
        this.context.step++;
        let roll = await game.impmal.tables.rollTable("origin", null, {showRoll : false, showResult : false});
        this.context.exp = 25
        this.updateMessage("Rolled", {rolled : roll.text})
        this.retrieveOrigin(roll.documentId)
    }

    async retrieveOrigin(id) {
        this.context.origin = await game.impmal.utility.findId(id);
        this.render(true);
    }

    async performSkillChoice()
    {

        const getOptionName = (skill, spec) => {
            let name = game.impmal.config.skills[skill];
            if (spec == "*")
            {
                name += " (Any)";
            }
            else if (spec) 
            {
                name += ` (${spec})`
            }
            return name;
        }


        let skillOptions = {};
        for(let s of this.context.origin.system.skills.toObject().list)
        {
            if (s.group)
            {
                if (skillOptions[s.group])
                {
                    skillOptions[s.group].list.push({skill: s.skill, spec: s.spec});
                }
                else 
                {
                    skillOptions[s.group] = {group: s.group, list: [{skill: s.skill, spec: s.spec}]};
                }
            }
            else 
            {
                skillOptions[s.skill + "-" + (s.skill.spec || "")] = s;
            }
        }

        for(let key in skillOptions)
        {
            let option = skillOptions[key];
            option.id = key;
            option.img = this.context.origin.img;
            let name;
            if (option.group)
            {
                name = option.list.map(i => getOptionName(i.skill, i.spec)).join(", ")
            }
            else 
            {
                name = getOptionName(option.skill, option.spec);
            }

            option.name = name
        }

        let choice = (await ItemDialog.create(Object.values(skillOptions), 1, {title: this.context.origin.name + " Skill Advances", text: "Gain 1 Advance in:"}))[0]

        if (!choice.list)
        {
            choice.list = [choice];
        }

        if (choice.list)
        {
            for(let skill of choice.list)
            {
                if (skill.spec == "*")
                {
                    let spec = (await game.impmal.utility.promptSkillSpecialisations(skill.skill))[0];
                    skill.spec = spec.name;
                    skill.uuid = spec.uuid;
                }
                else if (skill.spec)
                {
                    let found = await game.impmal.utility.findSpecialisation(skill.skill, skill.spec);
                    if (found)
                    {
                        skill.uuid = found.uuid;
                    }
                }
            }
        }

        choice.name = choice.list.map(c => getOptionName(c.skill, c.spec)).join(", ")
        this.context.skillChoice = choice;
        this.render(true);
    }

    activateListeners(html)
    {
        super.activateListeners(html);
        const dragDrop = new DragDrop({
            dropSelector: '.chargen-content',
            permissions: { drop: () => true },
            callbacks: { drop: this._onDrop.bind(this) },
          });

        dragDrop.bind(html[0]);

        html.find(".skill-choice").click(async ev => {
            this.performSkillChoice();
        })

        html.find(".skill-reset").click(async ev => {
            delete this.context.skillChoice;
            this.render(true);
        })
    }

}
