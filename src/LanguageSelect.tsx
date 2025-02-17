import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { LanguageType, currentLanguage, setLanguage } from "./languageSlice"
import { useAppDispatch, useAppSelector } from "./hooks"


function LanguageSelect() {


    const current = useAppSelector(currentLanguage)
    const dispatch = useAppDispatch()

    return(
        <>
        <Select
    id="demo-simple-select"
    value={current}
    label="Lang"
    onChange={(event: SelectChangeEvent) => 
        dispatch(setLanguage(event.target.value as LanguageType))
        } 
    // onChange={handleChange}
        
  >
    <MenuItem value={'de'}>Deutsch</MenuItem>
    <MenuItem value={'en'}>Englisch</MenuItem>
    <MenuItem value={'fr'}>Französisch</MenuItem>
  </Select>
        </>
    )
}

export default LanguageSelect