import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

const MultiSelectDropdown = ({ usrTagsProps, onChangeSelection }) => {
    const allTags = usrTagsProps.tags;

    // FUNC TO REMOVE DUPLICATED TAGS DATA
    const removeDuplicatedTags = (tagsData) => {
        const filterdData = tagsData.filter((tag, idx) => {
            return tagsData.indexOf(tag) === idx;
        });
        return filterdData;
    };
    const filteredTags = removeDuplicatedTags(allTags);

    useEffect(() => {
        const tags = filteredTags.map((tag, idx) => {
            return {
                id: idx,
                value: `${idx}`,
                label: tag
            };
        });

        setTagObj(tags);
    }, [usrTagsProps]);

    const [tagsObj, setTagObj] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        setSelectedOptions([]);
    }, []);

    function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
        if (value && value.some((o) => o.value === "*")) {
            return `${placeholderButtonLabel}: All`;
        } else {
            return `${placeholderButtonLabel}: ${value.length} selected`;
        }
    }

    function onChange(value, event) {
        let selectedTags = [];
        if (event.action === "select-option" && event.option.value === "*") {
            selectedTags = [...tagsObj];
            // setSelectedOptions(tagsObj);
        } else if (
            event.action === "deselect-option" &&
            event.option.value === "*"
        ) {
            selectedTags = [];
            // setSelectedOptions([]);
        } else if (event.action === "deselect-option") {
            // selectedTags = value.filter((o) => o.value !== "*");
            setSelectedOptions(value.filter((o) => o.value !== "*"));
        } else if (value.length === tagsObj.length - 1) {
            selectedTags = [...tagsObj];
            // setSelectedOptions(tagsObj);
        } else {
            selectedTags = value;
            // setSelectedOptions(value);
        }
        // console.log("SELECTED-TAGS CHANGE", selectedTags);
        onChangeSelection(selectedTags);
        setSelectedOptions(selectedTags);
    }

    return (
        <ReactMultiSelectCheckboxes
            options={[{ label: "All", value: "*" }, ...tagsObj]}
            placeholderButtonLabel="Tags"
            getDropdownButtonLabel={getDropdownButtonLabel}
            value={selectedOptions}
            onChange={onChange}
            setState={setSelectedOptions}
            width={"150px"}
        />
    );
};

export default MultiSelectDropdown;

// TODO TRY NEW FORM
{
    /* <MultiSelect
options={tagsObj}
value={selectedOptions}
onChange={onChange}
labelledBy={"Select"}
/> */
}
