

export class TestDialog extends WarhammerRollDialog
{
    get tooltipConfig() 
    {
        return {
            modifier : {
                label : "IMPMAL.Modifier",
                type : 1,
                path : "fields.modifier",
                hideLabel : true
            },
            SL : {
                label : "IMPMAL.SL",
                type : 1,
                path : "fields.SL"
            },
            difficulty : {
                label : "IMPMAL.Difficulty",
                type : 0,
                path : "fields.difficulty"
            },
            advantage : {
                label : "IMPMAL.Advantage",
                type : 1,
                path : "advantage"
            },
            disadvantage : {
                label : "IMPMAL.Disadvantage",
                type : 1,
                path : "disadvantage"
            }
        }
    }

    static get defaultOptions() 
    {
        const options = super.defaultOptions;
        options.classes = options.classes.concat(["impmal", "test-dialog", "form"]);
        options.width = 500;
        options.resizable = true;
        return options;
    }

    get template() 
    {
        return `systems/impmal/templates/apps/test-dialog/test-dialog.hbs`;
    }

    get context() 
    {
        return this.data.context;
    }

    // Backwards compatibility for scripts referencing adv/disCount
    get advCount()
    {
        return this.advantage;
    }

    set advCount(value)
    {
        this.advantage = value;
    }

    get disCount()
    {
        return this.disadvantage;
    }

    set disCount(value)
    {
        this.disadvantage = value;
    }

    advantage = 0;
    disadvantage = 0;
    forceState = "";

    _defaultFields() 
    {
        return foundry.utils.mergeObject(super._defaultFields(), {
            modifier : 0,
            SL : 0,
            difficulty : "challenging",
            state : "none",
        });
    }
    async getData() 
    {
        this.advantage = 0;
        this.disadvantage = 0;
        let data = await super.getData();
        
        data.advantage = this.advantage;
        data.disadvantage = this.disadvantage;
        this.fields.state = this.computeState();
        data.showSuperiority = this.actor.inCombat && this.actor.hasPlayerOwner;
        return data
    }

    async computeFields() 
    {
        if (this.fields.useSuperiority)
        {
            this.fields.SL += game.impmal.resources.get("superiority")
            this.tooltips.add("SL", game.impmal.resources.get("superiority"), game.i18n.localize("IMPMAL.Superiority"))
        }
    }

    /**
     * Compute whether disadvantage or advantage should be selected
     */
    computeState()
    {
        if (this.forceState) //"adv" "dis" and "none"
        {
            return this.forceState;
        }

        else if (this.advantage > this.disadvantage && this.advantage > 0)
        {
            this.tooltips.start(this);
            this.fields.modifier += 10 * ((this.advantage - 1) - this.disadvantage);
            this.tooltips.finish(this, "Excess Advantage");
            return "adv";
        }

        else if (this.disadvantage > this.advantage && this.disadvantage > 0)
        {
            this.tooltips.start(this);
            this.fields.modifier -= 10 * ((this.disadvantage - 1) - this.advantage);
            this.tooltips.finish(this, "Excess Disadvantage");
            return "dis";

        }

        else 
        {
            return "none";
        }
    }

    _onFieldChange(ev) 
    {
        // If the user clicks advantage or disadvantage, force that state to be true despite calculations
        if (ev.currentTarget.name == "state")
        {
            this.forceState = ev.currentTarget.value;
            this.render(true);
        }
        else return super._onFieldChange(ev);
    }

    createBreakdown()
    {
        let breakdown = super.createBreakdown();
        let difficulty = game.impmal.config.difficulties[this.fields.difficulty];
        breakdown.base = `<p>${game.i18n.localize("IMPMAL.Base")}: @BASE</p>`;
        breakdown.modifier = `<p>${game.i18n.localize("IMPMAL.Modifier")}: ${HandlebarsHelpers.numberFormat(this.fields.modifier, {hash : {sign: true}})}</p>`;
        breakdown.difficulty = `<p>${game.i18n.localize("IMPMAL.Difficulty")}: ${game.i18n.localize(difficulty.name)} (${HandlebarsHelpers.numberFormat(difficulty.modifier, {hash : {sign: true}})})</p>`;
        breakdown.SL = `<p>${game.i18n.localize("IMPMAL.SL")}: ${HandlebarsHelpers.numberFormat(this.fields.SL, {hash : {sign: true}})}</p>`;
        breakdown.advantage = `<p>${game.i18n.localize("IMPMAL.Advantage")}: ${this.advCount} ${this.userEntry.state == "adv" ? "(" + "Forced" + ")" : "" }</p>`;
        breakdown.disadvantage = `<p>${game.i18n.localize("IMPMAL.Disadvantage")}: ${this.disCount} ${this.userEntry.state == "dis" ? "(" + "Forced" + ")" : "" }</p>`;

        breakdown.modifiersBreakdown = this.tooltips.getCollectedTooltips();
        return breakdown;
    }
   
    get title()
    {
        return this.data.title;
    }

    /**
     * 
     * @param {object} actor Actor performing the test
     * @param {object} data Dialog data, such as title and actor
     * @param {object} fields Predefine dialog fields
     */
    static setupData(actor, target, options={})
    {
        log(`${this.prototype.constructor.name} - Setup Dialog Data`, {args : Array.from(arguments).slice(2)});

        let dialogData = {data : {}, fields : options.fields || {}};
        if (actor)
        {
            dialogData.data.speaker = ChatMessage.getSpeaker({actor});
        }
        dialogData.data.actor = actor;
        dialogData.data.context = options.context || {}; // Arbitrary values - used with scripts
        dialogData.data.context.tags = options.context?.tags || {}; // Tags shown below test results - used with scripts
        dialogData.data.context.text = options.context?.text || {}; // Longer text shown below test results - used with scripts
        dialogData.data.context.skipTargets = options.skipTargets
        if (actor && !actor?.token)
        {
            // getSpeaker retrieves tokens even if this sheet isn't a token's sheet
            delete dialogData.data.speaker.scene;
        }
        dialogData.data.title = (options.title?.replace || game.i18n.localize("IMPMAL.Test")) + (options.title?.append || "");
        if (target)
        {
            dialogData.data.target = target;
        }

        dialogData.fields.difficulty = dialogData.fields.difficulty || "challenging";

        let defendingAgainst = actor?.defendingAgainst

        dialogData.data.targets = (defendingAgainst || options.skipTargets) ? [] : Array.from(game.user.targets).filter(t => t.document.id != dialogData.data.speaker.token); // Remove self from targets

        // Defending scripts are dialog scripts coming from the attacker and/or the weapon used in the attack.
        // e.g. "Dodge tests to defend against this attack have disadvantage"
        let defendingScripts = defendingAgainst ? ((defendingAgainst.item?.getScripts("dialog").concat(defendingAgainst.actor?.getScripts("dialog"))).filter(s => s.options?.defending)) : []


        if (!options.skipTargets) 
        {
            // Collect Dialog effects 
            //   - Don't use our own targeter dialog effects, DO use targets' targeter dialog effects
            dialogData.data.scripts = foundry.utils.deepClone(
                (dialogData.data.targets
                    .map(t => t.actor)
                    .filter(actor => actor)
                    .reduce((prev, current) => prev.concat(current.getScripts("dialog", (s) => s.options?.targeter)), []) // Retrieve targets' targeter dialog effects
                    .concat(actor?.getScripts("dialog", (s) => !s.options?.targeter && !s.options?.defending) // Don't use our own targeter dialog effects
                    .concat(defendingScripts)
                    ))) || [];
        }
        else 
        {
            dialogData.data.scripts = actor?.getScripts("dialog", (s) => !s.options?.targeter).concat(defendingScripts) // Don't use our own targeter dialog effects
        }

        log(`${this.prototype.constructor.name} - Dialog Data`, {args : dialogData});
        return dialogData;
    }

}