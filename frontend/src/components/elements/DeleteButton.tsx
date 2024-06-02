import { MdDelete } from "react-icons/md";

type StatusType = "active" | "inactive";

interface DeleteButtonProps {
  status: StatusType;
  onClickFunction: () => void;
}

function DeleteButton({ status, onClickFunction }: DeleteButtonProps) {
  const buttonStyles =
    status === "active"
      ? "bg-red-500 hover:bg-orange-600 cursor-pointer"
      : "bg-slate-300 text-slate-50 cursor-not-allowed";

  return (
    <div>
      <button
        className={`inline-flex items-center justify-center w-6 h-6  text-slate-50 transition-colors duration-150 rounded-lg focus:shadow-outline ${buttonStyles}`}
        onClick={status === "active" ? onClickFunction : undefined}
        disabled={status !== "active"}
      >
        <span className="h-4">
          <MdDelete />
        </span>
      </button>
    </div>
  );
}

export default DeleteButton;
