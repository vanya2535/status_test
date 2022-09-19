export interface TreeItem {
  id: number | string,
  parent: number | string,
  type?: any
}

export class TreeStore {
  readonly parents: object
  readonly childrens: object

  constructor(items: Array<TreeItem>) {
    this.parents = {}
    this.childrens = {}

    for (let item of items) {
      this.parents[item.id] = item

      if (this.childrens[item.parent]) {
        this.childrens[item.parent].push(item)
      } else {
        this.childrens[item.parent] = [item]
      }
    }
  }

  getAll(): Array<TreeItem> {
    return Object.values(this.parents)
  }

  getItem(id: number | string): TreeItem {
    return this.parents[id]
  }

  getChildren(id: number | string): Array<TreeItem> {
    return this.childrens[id] || []
  }

  getAllChildren(id: number | string): Array<TreeItem> {
    const result = this.getChildren(id)

    for (let item of result) {
      result.push(...this.getChildren(item.id))
    }

    return result
  }

  getAllParents(id: number | string): Array<TreeItem> {
    const parent: TreeItem = this.getItem(this.getItem(id)?.parent)
    const result: Array<TreeItem> = []

    if (parent) {
      result.push(parent)
    }

    for (let item of result) {
      const candidate: TreeItem = this.getItem(item.parent)

      if (candidate) {
        result.push(candidate)
      }
    }

    return result
  }
}