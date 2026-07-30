let damage = this.effect.sourceTest.opposedTests[0]?.result.damage;

if (damage)
{ 
  damage = Math.floor(damage / 2);
  damage += parseInt(await ValueDialog.create({text: "Enter extra damage from spending Motive Force", title: this.effect.name}) || 0);
  this.actor.applyDamage(damage, {message: true});
}