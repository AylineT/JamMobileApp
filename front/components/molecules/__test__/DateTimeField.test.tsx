import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import { renderWithTamagui } from '../../../test-utils/renderWithTamagui'
import DateTimeField from '../DateTimeField'

describe('DateTimeField', () => {
  const mockDate = new Date('2025-04-12T15:00:00')

  it('affiche la date formatée', () => {
    const { getByText } = renderWithTamagui(
      <DateTimeField label="Début" mode="date" value={mockDate} onChange={() => {}} />
    )
    expect(getByText(mockDate.toLocaleDateString())).toBeTruthy()
  })

  it('affiche l’heure formatée', () => {
    const { getByText } = renderWithTamagui(
      <DateTimeField label="Heure" mode="time" value={mockDate} onChange={() => {}} />
    )
    expect(getByText(mockDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))).toBeTruthy()
  })
})