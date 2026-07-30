let traits = new TraitListModel();
traits.list = [{key: "penetrating", value: 5}, {key: "inflict", value: "Deafened"}]
this.actor.applyDamage(8, {traits, location: "head"}).then(data => this.script.scriptMessage("Took " + data.woundsGained + " Damage on " + data.location));