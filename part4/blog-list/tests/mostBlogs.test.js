const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('./sample').blogs

describe('mostBlogs', () => {
	test('no one has the most for empty list', () => {
		assert.deepStrictEqual(mostBlogs([]), { author: null, blogs: 0 })
	})

	test('when list has one blog that author has the most', () => {
		assert.deepStrictEqual(mostBlogs(blogs.slice(0, 1)), {  author: "Michael Chan", blogs: 1 })
	})

	test('among many blogs favorite is the one with the most likes', () => {
		assert.deepStrictEqual(mostBlogs(blogs), { author: "Robert C. Martin", blogs: 3 })
	})
})