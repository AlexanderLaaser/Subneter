function TableControl() {
  return (
    <div className="flex  sm:flex-col pt-10 font-montserrat xl:space-x-10 xl:flex-row">
      <div
        className="flex flex-1 flex-row justify-end space-x-4"
        id="vnetconfig"
      >
        <button
          className="inline-flex items-center justify-center pr-4 pl-4 h-10 text-slate-50 transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-orange-600"
          //onClick={handleAddClick}
        >
          <span className="text-l">Delete</span>
        </button>
        <button
          className="inline-flex items-center justify-center pr-4 pl-4 h-10 text-slate-50 transition-colors duration-150 bg-emerald-700 rounded-lg focus:shadow-outline hover:bg-orange-600"
          //onClick={handleAddClick}
        >
          <span className="text-l">Save</span>
        </button>
      </div>
    </div>
  );
}

export default TableControl;
