function TableEntry() {
  return (
    <>
      <div className="flex justify-center content-center w-full">
        <div className="flex items-center font-montserrat w-full max-w-screen-md bg-white mt-3 rounded-lg h-12">
          <div className="flex pl-6 min-w-60">
            <input placeholder="Name"></input>
          </div>
          <div className="flex pl-6">
            <select
              id="countries"
              className=" border border-grey text-sm rounded-lg focus:border-orange-600 p-1.5 "
            >
              <option value="US">/21</option>
              <option value="CA">/22</option>
              <option value="FR">/23</option>
              <option value="DE">/24</option>
              <option value="DE">/25</option>
              <option value="DE">/26</option>
              <option value="DE">/27</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableEntry;
