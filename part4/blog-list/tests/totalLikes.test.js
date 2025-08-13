const { test, describe } = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/list_helper').totalLikes
const blogs = require('./sample').blogs


describe('totalLikes', () => {
	test('0 likes for empty list', () => {
		assert.strictEqual(totalLikes([]), 0)
	})

	test('when list has only one blog, equals the likes of that', () => {
		assert.strictEqual(totalLikes(blogs.slice(0, 1)), blogs[0].likes)
	})

	test('equals the sum of the likes of all blogs', () => {
		assert.strictEqual(totalLikes(blogs), 36)
	})

})