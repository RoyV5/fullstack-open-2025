const { test, describe } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('./sample').blogs


describe('favoriteBlog', () => {
	test('no favorite for empty list', () => {
		assert.strictEqual(favoriteBlog([]), null)
	})

	test('when list has one blog that one is the favorite', () => {
		assert.deepStrictEqual(favoriteBlog(blogs.slice(0, 1)), blogs[0])
	})

	test('among many blogs favorite is the one with the most likes', () => {
		assert.deepStrictEqual(favoriteBlog(blogs), blogs[2])
	})

})