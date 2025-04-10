import React from 'react'
import ThirdPartyButton from '../ThirdPartyButton'
import { renderWithTamagui } from '../../../test-utils/renderWithTamagui'
import { fireEvent } from '@testing-library/react-native'
import { Text } from 'react-native'

describe('ThirdPartyButton', () => {
  it('affiche le texte et l’icône', () => {
    const { getByText } = renderWithTamagui(
      <ThirdPartyButton icon={<Text>🔒</Text>} text="Continuer avec Google" onPress={() => {}} />
    )
    expect(getByText('Continuer avec Google')).toBeTruthy()
    expect(getByText('🔒')).toBeTruthy()
  })

  it('déclenche onPress au clic', () => {
    const mockFn = jest.fn()
    const { getByText } = renderWithTamagui(
      <ThirdPartyButton icon={<Text>🔒</Text>} text="Login" onPress={mockFn} />
    )
    fireEvent.press(getByText('Login'))
    expect(mockFn).toHaveBeenCalled()
  })
})