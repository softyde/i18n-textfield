# I18n MUI Input Textfield

This is a design for a multilingual text input field for React/TS with MUI components.

## Dependencies

- [Typescript](https://www.typescriptlang.org)
- [React](https://react.dev)
- [React Redux](https://react-redux.js.org)
- [MUI (Material UI)](https://mui.com)

See [package.json](package.json) for the full list.

## Sample

See [here](https://annee.de/i18n-textfield/) for a running example.

## Usage

```ts
import TextInput from "./TextInput";
import { LabelType } from "./languageSlice";

//...

const labels: LabelType = { 
      de: "Eine Beschriftung", 
      en: "A label", 
      fr: "Une étiquette" 
    };

return( 
<>
  <TextInput
    inputId="someveryuniqueidentifier"
    labels={labels}
  />
</>)

```

## Screenshot
![Screenshot](/doc/screenshot_sample.png?raw=true "Screenshot")