let success = await this.effect.resistEffect();

if (!success)
{
  this.actor.system.applyDamage(1, {ignoreAP: true, message: true})
}