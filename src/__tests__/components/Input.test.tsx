import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Input from '../../components/Input'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'title',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    },
  }
})

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(<Input name="title" placeholder="Title" />)

    expect(getByPlaceholderText('Title')).toBeTruthy()
  })
})
