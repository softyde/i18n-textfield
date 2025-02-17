// My first React/MUI attempt. Please have mercy!
// phan 2025

import "./TextInput.css";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  LabelType,
  LanguageItemState,
  LanguageType,
  currentLanguage,
  currentSubmenu,
  languages,
  setSubMenu,
} from "./languageSlice";
import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import { Close, Language } from "@mui/icons-material";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

function TextInput({
  inputId,
  labels,
}: {
  inputId: string;
  labels: LabelType;
}) {
  const [data, setData] = useState<LanguageItemState>({
    selected: "de",
    values: new Map<LanguageType, string>(),
  });
  const [newLang, setNewLang] = useState<LanguageType | null>(null);
  const current = useAppSelector(currentLanguage);
  const dispatch = useAppDispatch();

  const currentSub = useAppSelector(currentSubmenu);

  const hasLang = data.values.has(current);

  const orderedKeys: LanguageType[] = [];
  for (const lang of languages) {
    if (data.values.has(lang)) {
      orderedKeys.push(lang);
    }
  }

  const lang = hasLang || orderedKeys.length == 0 ? current : orderedKeys[0];
  const text = data.values.get(lang) || "";
  const newLangInputRef = useRef(null);

  const addLanguage = (lang: LanguageType) => () => {
    setNewLang(lang);
  };

  const changeTranslateValue =
    (selectedLang: LanguageType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      data.values.set(selectedLang, value);
      setData((data) => ({ ...data }));
    };

  const blurTranslateValue =
    (selectedLang: LanguageType) =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (event.target.value == "") {
        data.values.delete(selectedLang);
        setData((data) => ({ ...data }));
      }
    };

  const blurNewLang = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      data.values.delete(newLang as LanguageType);
      setData((data) => ({ ...data }));
    }

    event.target.value = "";
    setNewLang(null);
  };

  const changeCurrentValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    data.values.set(lang, value);
    setData((data) => ({ ...data }));
  };

  const onFocusCurrentValue = (event: React.FocusEvent<HTMLInputElement>) => {
    if (lang != current) {
      data.values.set(current, "");
      setData((data) => ({ ...data }));

      event.target.value = "";
    }
  };

  const onBlurCurrentValue = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      data.values.delete(current);
      setData((data) => ({ ...data }));
    }
  };

  const handleClickShowMenu = () => {
    if (newLangInputRef.current != null) {
      const text = (newLangInputRef.current as HTMLInputElement).value;

      if (newLang != null && text == "") {
        data.values.delete(newLang as LanguageType);
        setData((data) => ({ ...data }));

        setNewLang(null);
      }
    }

    dispatch(setSubMenu(currentSub == inputId ? null : inputId));
  };

  const handleIgnoreMouseEvent = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevents the button from getting the focus
  };

  return (
    <>
      <div className="text-input" id={inputId}>
        <TextField
          onFocus={onFocusCurrentValue}
          onChange={changeCurrentValue}
          onBlur={onBlurCurrentValue}
          label={`${labels[current]} ${
            lang == current
              ? ""
              : `(🌐 ${getUnicodeFlagIcon(lang == "en" ? "gb" : lang)})`
          }`}
          value={text}
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      currentSub == inputId
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowMenu}
                    onMouseDown={handleIgnoreMouseEvent}
                    onMouseUp={handleIgnoreMouseEvent}
                    edge="end"
                  >
                    {currentSub == inputId ? <Close /> : <Language />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        ></TextField>

        {currentSub == inputId ? (
          <Paper className="lang-box" elevation={3}>
            {newLang != null ? (
              <div>
                <TextField
                  inputRef={newLangInputRef}
                  size="small"
                  value={data.values.get(newLang)}
                  label={labels[newLang]}
                  onChange={changeTranslateValue(newLang)}
                  onBlur={blurNewLang}
                  variant="outlined"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {getUnicodeFlagIcon(newLang == "en" ? "gb" : newLang)}
                        </InputAdornment>
                      ),
                    },
                  }}
                ></TextField>
              </div>
            ) : (
              <></>
            )}

            {orderedKeys
              .filter((item) => item != current && item != newLang)
              .map((item) => (
                <div>
                  <TextField
                    size="small"
                    value={data.values.get(item)}
                    label={labels[item]}
                    onChange={changeTranslateValue(item)}
                    onBlur={blurTranslateValue(item)}
                    variant="outlined"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            {getUnicodeFlagIcon(item == "en" ? "gb" : item)}
                          </InputAdornment>
                        ),
                      },
                    }}
                  ></TextField>
                </div>
              ))}

            <div>
              {languages
                .filter(
                  (item) => orderedKeys.indexOf(item) < 0 && item != newLang
                )
                .map((item) => (
                  <>
                    <IconButton onClick={addLanguage(item)}>
                      {getUnicodeFlagIcon(item == "en" ? "gb" : item)}
                    </IconButton>
                  </>
                ))}
            </div>
          </Paper>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default TextInput;
