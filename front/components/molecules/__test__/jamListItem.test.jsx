import React from 'react'
import { renderWithTamagui } from '../../../test-utils/renderWithTamagui'
import { JamListItem } from '../jamListItem'

const jam = {
  id: 1,
  title: 'Jam Funky',
  event_date: new Date('2025-04-20T21:00:00'),
  location: 'Paris',
  description: 'Session funky',
  is_participating: false,
  created_by: 1,
}

jest.mock('@/store/navigationStore', () => ({
  useNavigationStore: () => ({
    setActiveTab: jest.fn(),
    setJam: jest.fn(),
  }),
}))

jest.mock('@/services/jamService', () => ({
  default: {
    participate: jest.fn(),
    leave: jest.fn(),
  },
}))

describe('JamListItem', () => {
  it('affiche les infos du jam', () => {
    const { getByText } = renderWithTamagui(<JamListItem jam={jam} />)
    expect(getByText('Jam Funky')).toBeTruthy()
    expect(getByText('Paris')).toBeTruthy()
    expect(getByText("Plus d'infos")).toBeTruthy()
  })
})