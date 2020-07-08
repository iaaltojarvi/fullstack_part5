import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me myself and I',
    url: 'testing.com',
    likes: 100

  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).not.toHaveTextContent('testing.com')
})

test('not renders url by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me myself and I',
    url: 'testing.com',
    likes: 100
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).not.toHaveTextContent('testing.com')
})