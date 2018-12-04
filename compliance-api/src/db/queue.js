const q = {
  items: [],
  maxItems: 1,
  current: 0,
  setItems: function(arr) {
    this.items = arr
  },
  doAction: function(cb) {
    let items = this.getItems()

    if (items === false) {
      console.log('done')
      return
    }

    cb(items[0])
  },
  getItems: function() {
    const arr = this.items.slice(this.current, this.maxItems + this.current)
    this.current += this.maxItems

    if (arr.length >= 1) {
      return arr
    }

    return false
  },
}

module.exports.q = q
