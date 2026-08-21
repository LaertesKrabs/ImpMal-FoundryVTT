let roll = await new Roll("1d10").roll();
let msg;

if (roll.total <= 2) 
{
    msg = "The daemon’s very presence causes disturbance in The Motive Force. Tech Tests made by creatures in its presence are at Disadvantage.";
}
else if (roll.total <= 4) 
{
    msg = "One or several of the daemon’s limbs are chainblades; it has the Infernal Chainsaws Attack in addition to its other options.";
    this.actor.items.get("UiH06hv3fDi9R2Ot")?.delete();
}
else if (roll.total <= 6) 
{
    msg = "The daemon’s lungs bellow infernal flames; it has the Forge Flames Attack in addition to its other options.";
    this.actor.items.get("eDa2fBpJL4842mYV")?.delete()
}
else if (roll.total <= 8) 
{
    msg = "The daemon’s form has extra legs or a wheel-like mechanism to enhance its movement. Its Speed is Fast.";
    this.actor.update({"system.combat.speed.land.value" : "fast"})
}
else if (roll.total <= 10) 
{
    msg = "When wounded by an attack, the daemon emits a burst of unholy smog, inflicting the Poisoned Condition on all creatures within Short Range.";
    ActiveEffect.create({
        name: this.item.name,
        img: this.item.img,
        system: {
            scriptData: [{
                trigger: "takeDamage",
                label: "Damage",
                script: `if (args.woundsGained > 0) this.script.message("${msg}", {whisper: [game.user.id]})`
            }]
        }
    }, {parent: this.item})
}

this.effect.update({"system.transferData.type" : "other"});
this.script.message(`<strong>${roll.total}</strong>: ${msg}`, {whisper: [game.user.id]});