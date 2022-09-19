const { TreeStore } = require('../src/TreeStore.module')
const assert = require('assert');

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null }
]

const ts = new TreeStore(items)

it('TreeStore.getAll method test', () => {
  assert.equal(JSON.stringify(ts.getAll()), JSON.stringify(items))
})

it('TreeStore.getItem method test', () => {
  for (let item of items) {
    assert.equal(JSON.stringify(ts.getItem(item.id)), JSON.stringify(item))
  }

  for (let id of [12, 21, 'random']) {
    assert.equal(ts.getItem(id), undefined)
  }
})

it ('TreeStore.getChildren method test', () => {
  assert.equal(JSON.stringify(ts.getChildren(2)), '[{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}]')
  assert.equal(JSON.stringify(ts.getChildren(4)), '[{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]')
  assert.equal(JSON.stringify(ts.getChildren(12)), '[]')
})

it ('TreeStore.getAllChildren method test', () => {
  assert.equal(JSON.stringify(ts.getAllChildren(2)), '[{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]')
  assert.equal(JSON.stringify(ts.getAllChildren(12)), '[]')
})

it ('TreeStore.getAllParents method test', () => {
  assert.equal(JSON.stringify(ts.getAllParents(7)), '[{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}]')
  assert.equal(JSON.stringify(ts.getAllParents(12)), '[]')
})
