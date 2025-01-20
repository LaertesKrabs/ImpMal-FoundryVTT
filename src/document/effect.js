export class ImpMalEffect extends WarhammerActiveEffect
{

    static CONFIGURATION = {
        zones : true,
        exclude : {}
    };

    async resistEffect()
    {
        let result = await super.resistEffect();
        if (result === false || result === true)
        {
            return result;
        }

        let transferData = this.system.transferData;

        let test;
        let options = {title : {append : " - " + this.name}, context: {resist : [this.key].concat(this.sourceTest?.item?.type || []), resistingTest : this.sourceTest}};
        if (transferData.avoidTest.value == "item")
        {
            test = await this.actor.setupTestFromItem(this.item.uuid, options);
        }
        else if (transferData.avoidTest.value == "custom")
        {
            test = await this.actor.setupTestFromData(this.transferData.avoidTest, options);
        }

        await test.roll();

        if (!transferData.avoidTest.reversed)
        {
            // If the avoid test is marked as opposed, it has to win, not just succeed
            if (transferData.avoidTest.opposed && this.sourceTest)
            {
                return test.result.SL > this.sourceTest.result?.SL;
            }
            else 
            {
                return test.succeeded;
            }
        }
        else  // Reversed - Failure removes the effect
        {
            // If the avoid test is marked as opposed, it has to win, not just succeed
            if (transferData.avoidTest.opposed && this.sourceTest)
            {
                return test.result.SL < this.sourceTest.result?.SL;
            }
            else 
            {
                return !test.succeeded;
            }
        }
    }



    // Need to override base getter because IM doesn't have a `data` property holding all the test data
    get sourceTest() 
    {
        return this.system.sourceData.test;
    }

    get isCondition() 
    {
        return !!game.impmal.config.conditions.find(i =>i.id == this.key);
    }

    get isMinor()
    {
        return this.system.type == "minor"; 
    }

    get isMajor()
    {
        return this.system.type == "major"; 
    }

    // Computed effects mean flagged to know that they came from a calculation, notably encumbrance causing overburdened or restrained
    get isComputed()
    {
        return this.system.computed;
    }

    static findEffect(key, type="minor")
    {
        let effects = foundry.utils.deepClone(game.impmal.config.conditions).concat(foundry.utils.deepClone(Object.values(game.impmal.config.zoneEffects)));

        let effect = effects.find(i => i.id == key && i.system?.type == type);
        if (!effect)
        {
            effect = effects.find(i => i.id == key);
        }
        return effect;
    }
}
