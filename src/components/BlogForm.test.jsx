import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

const handleCreateBlogMock = vi.fn()
const handleMessageMock = vi.fn()

describe('<BlogForm />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://example.com'
  }

  beforeEach(() => {
    vi.spyOn(blogService, 'create').mockResolvedValue(blog)

    render(
      <BlogForm
        handleCreateBlog={handleCreateBlogMock}
        handleMessage={handleMessageMock}
      />
    )
  })

  test('new blog can be created', async () => {
    const user = userEvent.setup()
    
    const createButton = screen.getByRole('button', { name: /create new/i })

    await user.click(createButton)

    const title = screen.getByTestId(/title/i)
    const author = screen.getByTestId(/author/i)
    const url = screen.getByTestId(/url/i)
    const submitButton = screen.getByRole('button', { name: /create/i })

    await user.type(title, blog.title)
    await user.type(author, blog.author)
    await user.type(url, blog.url)

    await user.click(submitButton)
    
    expect(handleCreateBlogMock.mock.calls).toHaveLength(1)
    expect(handleCreateBlogMock.mock.calls[0][0]).toEqual(blog)
  })
})
