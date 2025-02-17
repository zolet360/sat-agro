import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import autoCompleteService from "@/services/autocomplete";

type AutocompleteProps = {
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  id: string;
  value?: { label: string; value: string };
  placeholder?: string;
  url: string;
  required?: boolean;
  onSelected?: (result: { label: string; value: string }) => void;
  onChange?: (value: string | { label: string; value: string }) => void;
  class_name?: string;
  disabled?: boolean;
  label?: string;
  user_id?: number;
};

type ResultType = { label: string; value: string };

export const Autocomplete: React.FC<AutocompleteProps> = ({ setFormData, id, value, placeholder, url, required, onSelected, onChange, class_name, disabled, label, user_id }) => {
  const [results, setResults] = useState<ResultType[] | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const { bottom, left, width } = inputRef.current.getBoundingClientRect();
      setDropdownPosition({ top: bottom + window.scrollY, left, width });
    }
  }, [results]);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = event.target.value;
    if (valueInput !== "") {
      console.log(valueInput, url, user_id);
      setFormData((prevData) => ({ ...prevData, [id]: { label: valueInput, value: "" } }));
      const filteredResults = await autoCompleteService.buscaResultados(valueInput, url, user_id);
      setResults(filteredResults);
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: { label: "", value: "" } }));
      setResults(null);
    }
    if (onChange) {
      onChange("");
    }
  };

  const handleInputOnClick = async (event: React.MouseEvent<HTMLInputElement>) => {
    const valueInput = (event.target as HTMLInputElement).value;
    setFormData((prevData) => ({ ...prevData, [id]: { label: valueInput, value: "" } }));
    console.log(valueInput, url, user_id);
    const filteredResults = await autoCompleteService.buscaResultados(valueInput, url, user_id);
    setResults(filteredResults);
    if (onChange) {
      onChange("");
    }
  };

  const handleResultClick = (result: ResultType) => {
    setFormData((prevData) => ({ ...prevData, [id]: result }));
    if (onChange) {
      onChange(result);
    }
    setResults(null);
    if (onSelected) {
      onSelected(result);
    }
  };

  return (
    <div className={`${class_name} flex flex-col relative`}>
      {label && <label className="font-semibold text-soft-gray">{label}</label>}
      <input
        ref={inputRef}
        onClick={(e) => {
          if (!value?.label) {
            handleInputOnClick(e);
          }
        }}
        onBlur={(e) => {
          setTimeout(() => {
            if (!e.relatedTarget || !(e.relatedTarget as HTMLElement).classList.contains("ClassFantasma")) {
              setResults(null);
            }
          }, 250);
        }}
        type="text"
        id={id}
        name={id}
        value={value?.label ?? ""}
        onChange={handleInputChange}
        className="px-2 py-1 rounded-lg shadow-md bg-soft-black border-2 border-light-black outline-none placeholder:text-light-soft-black"
        placeholder={placeholder}
        required={required}
        disabled={disabled ?? false}
        autoComplete="off"
      />
      <input type="hidden" value={value?.label ?? ""} />

      {results?.length > 0 &&
        ReactDOM.createPortal(
          <div
            className="absolute z-50 w-full"
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 9999,
            }}
          >
            <ul className="w-full border border-light-black rounded-b-lg bg-soft-black rounded-none shadow-md mt-1">
              {results.map((result, index) => (
                <li
                  key={index}
                  className="hover:bg-black cursor-pointer rounded-b-lg p-2"
                  onClick={() => {
                    if (result?.label) {
                      handleResultClick(result);
                    }
                  }}
                >
                  {result?.label}
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
};
