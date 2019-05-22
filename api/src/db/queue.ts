const q = {
  items: [],
  maxItems: 1,
  current: 0,
  setItems: (arr: any[]) => {
    this.items = arr
  },
  doAction: (cb) => {
    let items = this.getItems()

    if (items === false) {
      console.log('all files saved')
      return
    }

    cb(items[0])
  },
  getItems: () => {
    const arr = this.items.slice(this.current, this.maxItems + this.current)
    this.current += this.maxItems

    if (arr.length >= 1) {
      return arr
    }

    return false
  }
}

module.exports.q = q
