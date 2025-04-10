import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import CustomButton from '../CustomButton'
import { renderWithTamagui } from '../../../test-utils/renderWithTamagui'

describe('CustomButton', () => {
  it('affiche le texte correctement', () => {
    const { getByText } = renderWithTamagui(
      <CustomButton text="test" onPress={() => {}} />
    )
    expect(getByText('test')).toBeTruthy()
  })

  it('déclenche l’action onPress', () => {
    const mockFn = jest.fn()
    const { getByText } = renderWithTamagui(
      <CustomButton text="Test" onPress={mockFn} />
    )
    fireEvent.press(getByText('Test'))
    expect(mockFn).toHaveBeenCalled()
  })
})