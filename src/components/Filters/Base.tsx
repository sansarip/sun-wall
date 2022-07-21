import { Button, Intent } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { noop } from "lodash";
import { useState } from "react";
import styled from "styled-components";

export type Props = {
  children?: string | JSX.Element;
  disabled?: boolean;
  label: string | JSX.Element | undefined;
  onApply?: () => void;
  onClear?: () => void;
  onClose?: () => void;
};

const PopoverContent = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  padding: 1rem;

  .filter-base_actions {
    display: flex;
    gap: 1rem;
    justify-content: end;

    button {
      min-width: 6rem;
    }
  }
`;

export const Base: React.FC<Props> = ({
  children,
  disabled,
  label,
  onApply,
  onClear,
  onClose = noop,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closePopover = () => {
    setIsOpen(false);
    onClose();
  };
  const openPopover = () => setIsOpen(true);
  const withClose = (f: Function | undefined) => () => {
    closePopover();
    f && f();
  };

  return (
    <Popover2
      content={
        <PopoverContent>
          <div>{children}</div>
          <div className="filter-base_actions">
            {!!onClear && <Button onClick={withClose(onClear)} text="Clear" />}
            {!!onApply && (
              <Button
                intent={Intent.PRIMARY}
                onClick={withClose(onApply)}
                text="Apply"
              />
            )}
          </div>
        </PopoverContent>
      }
      enforceFocus={false}
      isOpen={isOpen}
      modifiers={{ arrow: { enabled: false } }}
      onClose={closePopover}
      placement="bottom"
    >
      <Button disabled={disabled} onClick={openPopover} text={label} />
    </Popover2>
  );
};

export default Base;
