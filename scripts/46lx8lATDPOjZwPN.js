let mode = (await ItemDialog.create(ItemDialog.objectToArray({
  staff: "Staff Mode",
  whip: "Whip Mode",
  ranged: "Ranged Mode"
}, this.item.img)))[0];

this.item.setFlag("impmal", "mode", mode.id);