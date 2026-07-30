if ((args.critical || args.opposed?.attackerTest?.result.critical) && args.opposed?.attackerTest?.result.hitLocation == "head")
{
  this.script.message("[[/r 1d100]]{25%} chance Critical Hit hits the Binary Cortex")
}