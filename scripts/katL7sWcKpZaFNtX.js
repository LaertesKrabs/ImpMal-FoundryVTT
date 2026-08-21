if (await this.actor.spend("flags.impmal.motiveForceCurrent"))
{
  this.script.message("Spent Motive Force")
}
else 
{
  this.script.notification("Not enough Motive Force!", "error");
}