import { Button, MenuItem } from "@blueprintjs/core";
import { Select2 } from "@blueprintjs/select";

export type SelectableNumber = 25 | 50 | 75 | 100 | 200;
type Option = { number: SelectableNumber };
type Props = {
  disabled?: boolean;
  onSelect: (number: SelectableNumber) => void;
  value: SelectableNumber;
};
export const selectableNumbers: SelectableNumber[] = [25, 50, 75, 100, 200];
const items: Option[] = selectableNumbers.map((number) => ({ number }));

const Select = Select2.ofType<Option>();
const Item: React.FC<Option> = ({ number }, { handleClick }) => {
  return <MenuItem text={number} key={number} onClick={handleClick} />;
};

export const NumResultsSelect: React.FC<Props> = ({ disabled, onSelect, value }) => {
  return (
    <Select
      disabled={disabled}
      filterable={false}
      items={items}
      itemRenderer={Item}
      onItemSelect={({ number }) => onSelect(number)}
      popoverProps={{ minimal: true }}
    >
      <Button
        disabled={disabled}
        rightIcon="double-caret-vertical"
        text={`${value} results`}
      />
    </Select>
  );
};

export default NumResultsSelect;
