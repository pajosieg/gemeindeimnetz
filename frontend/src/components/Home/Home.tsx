import * as React from 'react'
import { getFilteredEntries } from '../../api/Entry'
import { Entry } from '../../models/Entry'
import { Card } from '../Card/Card'
import { CategoryFilter, FilterType } from '../CategoryFilter/CategoryFilter'

export const Home = () => {
  const [filteredEntries, setFilteredEntries] = React.useState<Entry[]>([])

  const handleFilterChange = React.useCallback(async (filter: FilterType) => {
    const sortEntriesByDateAndTime = (e1: Entry, e2: Entry) => {
      const compareDate = e1.date.localeCompare(e2.date)
      if (compareDate === 0) {
        return e1.time.localeCompare(e2.time)
      }
      return compareDate
    }

    setFilteredEntries(
      (await getFilteredEntries(filter)).sort(sortEntriesByDateAndTime)
    )
  }, [])

  return (
    <div className="App">
      <CategoryFilter onFilterChange={handleFilterChange} />
      <div className="grid">
        {filteredEntries.map((entry, index) => (
          <div className="col col-lg-6" key={index}>
            <Card {...entry} />
          </div>
        ))}
      </div>
    </div>
  )
}
