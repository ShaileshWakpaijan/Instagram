const Modal = ({ isOpen, setIsOpen, options, user, setClickedOn }) => {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`
        fixed z-50 inset-0 flex justify-center items-center transition-colors ${
          isOpen ? "visible bg-black/60" : "invisible"
        }
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={` text-sm text-neutral-100 bg-stone-800 w-64 overflow-hidden rounded-xl shadow  transition-all flex flex-col items-center
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      >
        {user && (
          <div className=" flex flex-col items-center">
            <div
              id="profile-picture"
              className=" my-7 w-24 h-24 rounded-full overflow-hidden bg-white"
            >
              <img
                src={`${user.profilePicture}`}
                className=" w-full object-cover object-center"
              />
            </div>
            <p className=" mb-4">Unfollow @{user.username}</p>
          </div>
        )}
        {options &&
          options.map((ops, i) => {
            return (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setClickedOn(ops.content);
                }}
                key={i}
                className={` ${ops.style} font-semibold w-full py-4 border-t-[1px] border-neutral-500`}
              >
                {ops.content}
              </button>
            );
          })}
        <button onClick={() => setIsOpen(false)} className="border-t-[1px] border-neutral-500 w-full py-4 ">
          Cancle
        </button>
      </div>
    </div>
  );
};

export default Modal;
