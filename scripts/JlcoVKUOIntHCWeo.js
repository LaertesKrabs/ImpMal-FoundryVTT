let roll = await new Roll("1d100").roll();
roll.toMessage(this.script.getChatData());
this.item.update({name: this.item.setSpecifier(roll.total)});