import React from 'react'
import { render, fireEvent, userEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogEntry from './BlogEntry'

test('<BlogEntry /> updates parent state and calls handleSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogEntry handlePost={addBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'I am the author' }
  })
  fireEvent.change(url, {
    target: { value: 'thisisaddress.com' }
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls[0][0])
  expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(addBlog.mock.calls[0][0].author).toBe('I am the author')
  expect(addBlog.mock.calls[0][0].url).toBe('thisisaddress.com')
})