const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('./sample').blogs

describe('mostLikes', () => {
	test('no one has the most for empty list', () => {
		assert.deepStrictEqual(mostLikes([]), { author: null, likes: 0 })
	})

	test('when list has one blog shows the likes of that author', () => {
		assert.deepStrictEqual(mostLikes(blogs.slice(0, 1)), {  author: "Michael Chan", likes: 7 })
	})

	test('among many blogs shows the author with the most likes', () => {
		assert.deepStrictEqual(mostLikes(blogs), { author: "Edsger W. Dijkstra", likes: 17 })
	})
})