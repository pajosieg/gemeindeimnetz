import * as React from 'react'
import { ReactComponent as CatholicsMapSVG } from '../../assets/svg/cath_map.svg'
import { ReactComponent as ProtestantsMapSVG } from '../../assets/svg/prot_map.svg'
import './GermanMap.scss'

export enum CONFESSION {
  CATHOLIC,
  PROTESTANT,
}

export interface IGermanMapProps {
  confession: CONFESSION
}

export const GermanMap = ({ confession }: IGermanMapProps) => {
  return (
    <div className="german-map">
      {confession === CONFESSION.CATHOLIC ? (
        <>
          <h2>Wähle dein Bistun</h2>
          <CatholicsMapSVG />
        </>
      ) : (
        <>
          <h2>Wähle deine Landeskirche</h2>
          <ProtestantsMapSVG />
        </>
      )}
    </div>
  )
}
