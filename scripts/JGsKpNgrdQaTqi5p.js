if (this.actor.system.combat.wounds.value > 0)
{ 
  this.script.notification("Healed 1 Wound");
  this.actor.update({"system.combat.wounds.value" : this.actor.system.combat.wounds.value - 1});
}