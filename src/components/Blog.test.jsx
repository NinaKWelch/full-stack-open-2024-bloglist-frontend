import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const handleLikesMock = vi.fn()
const handleRemoveBlogMock = vi.fn()

describe('<Blog />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://example.com',
    likes: 0,
    user: { username: 'User' }
  }

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        handleLikes={handleLikesMock}
        handleRemoveBlog={handleRemoveBlogMock}
        enableDelete={false}
      />
    )
  })

  test('renders initial content', () => {
    const title = screen.getByText(/title/i)
    const author = screen.getByText(/author/i)
    const url = screen.queryByText('https://example.com')
    const likes = screen.queryByText(/likes/i)

    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
  })

  test('clicking show button reveals url and likes', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByRole('button', { name: /show/i })

    await user.click(showButton)

    const url = screen.getByText('https://example.com')
    const likes = screen.getByText(/likes/i)

    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
  })  

  test('clicking like button calls handleLikes', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByRole('button', { name: /show/i })

    await user.click(showButton)

    const likeButton = screen.getByRole('button', { name: /like/i })

    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLikesMock.mock.calls).toHaveLength(2)
  })
})

