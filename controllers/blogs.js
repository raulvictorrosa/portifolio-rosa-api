const mongoose = require('mongoose')
const Blog = mongoose.model('Blog')

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({
      createdAt: -1
    })
    return res.json(blogs)
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.getBlogBydId = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    return res.json(blog)
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
    return res.json(blog)
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.createBlog = async (req, res) => {
  const blogData = req.body
  blogData.userId = req.user.sub

  try {
    const blog = new Blog(blogData)
    const createdBlog = await blog.save()
    return res.json(createdBlog)
  } catch (error) {
    return res.status(422).json(error)
  }
}
