interface SizeSelectProps {
  elementID: string;
  value: number;
  tailWindConfig: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type: string;
}

function SubnetMaskSelect({
  elementID,
  value,
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
      value={value}
      className={tailWindConfig}
      onChange={onChangeFunction}
    >
      {suffixOptions}
    </select>
  );
}

export default SubnetMaskSelect;
