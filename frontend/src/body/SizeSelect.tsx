function SizeSelect(props: {
  elementID: any;
  defaultValue: any;
  tailWindConfig: any;
  onChangeFunction: any;
}) {
  const suffixOptions = [];
  for (let i = 14; i <= 32; i++) {
    suffixOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const { elementID, defaultValue, tailWindConfig, onChangeFunction } = props;
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
