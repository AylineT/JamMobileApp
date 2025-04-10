import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import CustomInput from '../CustomInput'
import { renderWithTamagui } from '../../../test-utils/renderWithTamagui'

describe('CustomInput', () => {
  it('affiche le placeholder', () => {
    const { getByPlaceholderText } = renderWithTamagui(
      <CustomInput placeholder="Email" value="" onChangeText={() => {}} />
    )
    expect(getByPlaceholderText('Email')).toBeTruthy()
  })

  it('déclenche onChangeText quand on tape', () => {
    const mockFn = jest.fn()
    const { getByPlaceholderText } = renderWithTamagui(
      <CustomInput placeholder="Email" value="" onChangeText={mockFn} />
    )
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@mail.com')
    expect(mockFn).toHaveBeenCalledWith('test@mail.com')
  })

  it('gère les champs sécurisés (mot de passe)', () => {
    const { getByPlaceholderText } = renderWithTamagui(
      <CustomInput placeholder="Mot de passe" value="123" onChangeText={() => {}} secureTextEntry />
    )
    const input = getByPlaceholderText('Mot de passe')
    expect(input.props.secureTextEntry).toBe(true)
  })
})