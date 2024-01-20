function TableHead() {
  return (
    <>
      <div className="flex justify-center content-center w-full">
        <div className="flex font-montserrat pt-6 w-full max-w-screen-md">
          <div className="w-min text-zinc-500 font-bold pr-56">Name</div>
          <div className="w-min text-zinc-500 font-bold pr-20">Größe</div>
          <div className="w-min text-zinc-500 font-bold pr-16">IPs</div>
          <div className="w-min text-zinc-500 font-bold"> Range</div>
        </div>
      </div>
    </>
  );
}

export default TableHead;
