import { Button, Intent } from "@blueprintjs/core";
import { PlacementOptions, Popover2 } from "@blueprintjs/popover2";
import { useCallback } from "react";
import { useState } from "react";
import styled from "styled-components";

type FilterOptionProps = {
    children?: string | JSX.Element;
    label: string | JSX.Element | undefined;
    onApply?: () => void;
    onClear?: () => void;
}

const PopoverContent = styled.div`
    display: grid;
    grid-template-areas: 
        "body body" 
        "left right";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
    column-gap: 1rem;
    padding: 1rem;
    row-gap: 2rem;
    width: 100%;

    #filter-option_content-body {
        grid-area: body;
        max-width: 20rem;
    }
    #filter-option_clear {
        grid-area: left;
    }
    #filter-option_apply {
        grid-area: right;
    }
`

const FilterOption: React.FC<FilterOptionProps> = ({ children, label, onApply, onClear }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closePopover = useCallback(() => setIsOpen(false), [setIsOpen]);
    const openPopover = useCallback(() => setIsOpen(true), [setIsOpen]);

    return <Popover2
        content={<PopoverContent>
            <div id="filter-option_content-body">{children}</div>
            <Button id="filter-option_clear" onClick={onClear} text="Clear" />
            <Button id="filter-option_apply" intent={Intent.PRIMARY} onClick={onApply} text="Apply" />
        </PopoverContent>}
        enforceFocus={false}
        isOpen={isOpen}
        modifiers={{arrow: {enabled: false}}}
        onClose={closePopover}
        placement="bottom">
        <Button onClick={openPopover} text={label} />
    </Popover2>
}

export default FilterOption;