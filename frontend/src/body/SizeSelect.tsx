import VnetStore from "../store/VnetInputStore";

interface SizeSelectProps {
  elementID: string;
  defaultValue: number;
  tailWindConfig: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type: string;
}

function SizeSelect({
  elementID,
  defaultValue,
  tailWindConfig,
  onChangeFunction,
  type,
}: SizeSelectProps) {
  const { vnet } = VnetStore((state) => ({
    vnet: state.vnet,
  }));

  const suffixOptions = [];
  // var maxSuffixValue = vnet.vnetSuffix;

  // if (type === "vnet") {
  //   maxSuffixValue = 14;
  // }

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
