let lostFingers = this.actor.getFlag("impmal", "lostFingers") || 0;
        lostFingers += this.item.getFlag("impmal", "lostFingers") || 1;
        foundry.utils.setProperty(this.actor, "flags.impmal.lostFingers", lostFingers);