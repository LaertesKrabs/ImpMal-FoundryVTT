if (args.opposed && args.opposed.attackerTest.item?.system.isRanged)
                            {
                                args.modifiers.push({value : -4, label : this.effect.name, armour : true})
                            }