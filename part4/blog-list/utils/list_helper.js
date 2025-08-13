const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} 
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	}
	return blogs.reduce((favorite, blog) => {
		if (favorite.likes > blog.likes) {
			return favorite
		} else return blog
	})
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return { author: null, blogs: 0 }
	}

	const authorBlogs = {}
	blogs.forEach(blog => {
		authorBlogs[blog.author] = (authorBlogs[blog.author] ?? 0) + 1
	})
	let maxAuthor = ''
	let maxBlogs = 0
	for (const [key, value] of Object.entries(authorBlogs)) {
		if (value > maxBlogs) {
			maxBlogs = value
			maxAuthor = key
		}
	}
	return { author: maxAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return { author: null, likes: 0 }
	}
	const authorLikes = {}
	blogs.forEach(blog => {
		authorLikes[blog.author] = (authorLikes[blog.author] ?? 0) + blog.likes
	})
	console.log(authorLikes);
	
	let maxAuthor = ''
	let maxLikes = 0
	for (const [key, value] of Object.entries(authorLikes)) {
		if (value > maxLikes) {
			maxLikes = value
			maxAuthor = key
		}
	}
	return { author: maxAuthor, likes: maxLikes }
}




module.exports = {
  dummy, 
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}