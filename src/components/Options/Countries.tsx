import { Button, Menu, MenuItem } from "@blueprintjs/core";
import { IItemListRendererProps, Select2 } from "@blueprintjs/select";
import { getNames } from "country-list";
import styled from "styled-components";

type Country = { name: string };
type Props = {
  disabled?: boolean;
  onSelect: (name: string) => void;
  value: string;
};
export const countryNames = getNames();
const items: Country[] = ["", ...countryNames].map((name) => ({ name }));
const Item: React.FC<Country> = ({ name }, { handleClick }) => {
  return <MenuItem title={name} text={name || "-"} key={name} onClick={handleClick} />;
};

const itemFilter = (query: string, { name }: Country) => {
  return name.toLowerCase().includes(query.toLowerCase());
};

const ResponsiveMenu = styled(Menu)`
  @media only screen and (max-width: 600px) {
    max-width: 12rem;
  }
`;
const List: React.FC<IItemListRendererProps<Country>> = ({
  filteredItems,
  renderItem,
}) => (
  <ResponsiveMenu>
    {filteredItems.splice(0, 20).map((item, i) => renderItem(item, i))}
  </ResponsiveMenu>
);

const Select = Select2.ofType<Country>();

export const Countries: React.FC<Props> = ({ disabled, onSelect, value }) => {
  return (
    <Select
      disabled={disabled}
      filterable={true}
      items={items}
      itemPredicate={itemFilter}
      itemRenderer={Item}
      itemListRenderer={List}
      onItemSelect={({ name }) => onSelect(name)}
      popoverProps={{
        minimal: true,
        className: "sun-wall_list",
      }}
      resetOnClose={true}
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
