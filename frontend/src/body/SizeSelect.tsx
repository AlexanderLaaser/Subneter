interface SizeSelectProps {
  elementID: string;
  defaultValue: number;
  tailWindConfig: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SizeSelect({
  elementID,
  defaultValue,
  tailWindConfig,
  onChangeFunction,
}: SizeSelectProps) {
  const suffixOptions = [];
  for (let i = 14; i <= 32; i++) {
    suffixOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <select
      id={elementID}
      className={tailWindConfig}
      onChange={onChangeFunction}
      defaultValue={defaultValue}
    >
      {suffixOptions}
    </select>
  );
}

export default SizeSelect;
