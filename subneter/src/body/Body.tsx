import IpInput from "./IpInput";
import Tab from "./Tab";
import TableEntry from "./TableEntry";
import TableHead from "./TableHead";

function Body() {
  return (
    <div className="bg-blue-100 h-screen ">
      <IpInput></IpInput>
      <Tab></Tab>
      <TableHead></TableHead>
      <TableEntry></TableEntry>
    </div>
  );
}

export default Body;
