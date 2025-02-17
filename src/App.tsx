import "./App.css";
import TextInput from "./TextInput";
import { Box, Typography } from "@mui/material";
import LanguageSelect from "./LanguageSelect";

function App() {
  return (
    <>
      <div className="card">
        <Typography variant="h6">Select Language</Typography>
        <LanguageSelect />
        <div className="spacing wide"></div>

        <Box className="input-fields">
          <Typography variant="h6">Sample Textfields</Typography>
          <div className="spacing"></div>

          <TextInput
            inputId="textfieldA"
            labels={{
              de: "Nabenhöhe",
              en: "Hub height",
              fr: "Hauteur du moyeu",
            }}
          />
          <div className="spacing"></div>
          <TextInput
            inputId="textfieldB"
            labels={{ de: "Abweichung", en: "Deviation", fr: "Écart" }}
          />
        </Box>

        <div className="spacing wide"></div>

        <Typography variant="subtitle2">
          Copyright (c) 2025 Philipp Anné
        </Typography>
      </div>
    </>
  );
}

export default App;
