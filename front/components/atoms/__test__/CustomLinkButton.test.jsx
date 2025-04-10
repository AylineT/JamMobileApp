import React from 'react'
import { renderWithTamagui } from '../../../test-utils/renderWithTamagui'
import CustomLinkButton from '../CustomLinkButton'

jest.mock('expo-router', () => ({
  Link: ({ children }) => children,
}))

describe('CustomLinkButton', () => {
  it('affiche le texte du bouton (primary)', () => {
    const { getByText } = renderWithTamagui(
      <CustomLinkButton text="Aller à la page" href="/page" />
    )
    expect(getByText('Aller à la page')).toBeTruthy()
  })

  it('affiche un style secondaire si variant="secondary"', () => {
    const { getByText } = renderWithTamagui(
      <CustomLinkButton text="Retour" href="/" variant="secondary" />
    )
    const button = getByText('Retour')
    expect(button).toBeTruthy()
  })
})