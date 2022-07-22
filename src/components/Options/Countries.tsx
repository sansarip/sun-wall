import { Button, MenuItem } from "@blueprintjs/core";
import { Select2 } from "@blueprintjs/select";
import { getNames } from "country-list";

type Country = { name: string };
type Props = {
  disabled?: boolean;
  onSelect: (name: string) => void;
  value: string;
};
export const countryNames = getNames();
const items: Country[] = countryNames.map((name) => ({ name }));
const Item: React.FC<Country> = ({ name }, { handleClick }) => {
  return <MenuItem title={name} text={name} key={name} onClick={handleClick} />;
};

const itemFilter = (query: string, { name }: Country) => {
  return name.toLowerCase().includes(query.toLowerCase());
};

const Select = Select2.ofType<Country>();

export const Countries: React.FC<Props> = ({ disabled, onSelect, value }) => {
  return (
    <Select
      disabled={disabled}
      filterable={true}
      items={items}
      itemPredicate={itemFilter}
      itemRenderer={Item}
      onItemSelect={({ name }) => onSelect(name)}
      popoverProps={{ minimal: true }}
    >
      <Button
        disabled={disabled}
        rightIcon="double-caret-vertical"
        text={value}
      />
    </Select>
  );
};

export default Countries;
