import { useState } from "react";
import Base, { Props } from "./Base";
import { DatePicker } from "@blueprintjs/datetime";
import { format, getDate, getMonth, getYear } from "date-fns";
import { noop } from "lodash";
import { getYesterday } from "src/utils";

type CalendarProps = Pick<Props, "onClear"> & {
  defaultDate?: Date;
  disabled?: boolean;
  onApply?: (year: number, month: number, day: number) => void;
};

const earliestWikipediaArticleDate = new Date(2001, 0, 15);

export const Calendar: React.FC<CalendarProps> = ({
  disabled,
  defaultDate: _defaultDate,
  onApply = noop,
}) => {
  const maxDate = getYesterday();
  const defaultDate =
    _defaultDate && _defaultDate <= maxDate ? _defaultDate : maxDate;
  const [date, setDate] = useState<Date>(maxDate);
  const [appliedDate, setAppliedDate] = useState<Date>(date);
  const label = format(appliedDate, "MMM dd, yyyy");
  const applyDate = () => {
    setAppliedDate(date);
    onApply(getYear(date), getMonth(date), getDate(date));
  };
  const resetDate = () => setDate(defaultDate);

  return (
    <Base
      disabled={disabled}
      label={label}
      onApply={applyDate}
      onClose={resetDate}
    >
      <DatePicker
        value={date}
        minDate={earliestWikipediaArticleDate}
        maxDate={maxDate}
        onChange={setDate}
      />
    </Base>
  );
};

export default Calendar;
