import VnetStore from "../../store/VnetStore";

interface SizeSelectProps {
  elementID: string;
  defaultValue: number;
  tailWindConfig: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type: string;
}

function SubnetMaskSelect({
  elementID,
  defaultValue,
  tailWindConfig,
  onChangeFunction,
}: SizeSelectProps) {
  const { vnet } = VnetStore((state) => ({
    vnet: state.vnet,
  }));

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
      value={vnet.subnetmask}
      className={tailWindConfig}
      onChange={onChangeFunction}
      defaultValue={defaultValue}
    >
      {suffixOptions}
    </select>
  );
}

export default SubnetMaskSelect;
