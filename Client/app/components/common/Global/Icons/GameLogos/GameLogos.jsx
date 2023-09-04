const GameLogos = ({ game }) => {
  if (game == "League of Legends") {
    return (
      <div className="bg-[#D99743] p-2 rounded-[5px]">
        <svg
          className="fill-black w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.6 2a.458.458 0 0 0-.4.5.367.367 0 0 0 .1.3l1.3 1.7v15.2l-1.7 1.7a.377.377 0 0 0 .1.6h13.4a.758.758 0 0 0 .4-.2l2.3-2.3a.377.377 0 0 0-.1-.6.367.367 0 0 0-.3-.1h-9.5V2.5a.472.472 0 0 0-.5-.5ZM12 3.8v.9a8.237 8.237 0 0 1 8.2 8.2 7.955 7.955 0 0 1-1.7 5h1.1a8.9 8.9 0 0 0 1.5-5A9.133 9.133 0 0 0 12 3.8Zm0 1.8v12.3h5.3a7.479 7.479 0 0 0 2-5A7.341 7.341 0 0 0 12 5.6Zm-6.4.8a9.519 9.519 0 0 0-2.7 6v1.3a9.269 9.269 0 0 0 2.7 5.7V18a8.147 8.147 0 0 1-1.8-5.1 7.754 7.754 0 0 1 1.8-5.1V6.4Zm0 3a7.3 7.3 0 0 0-.9 3.5 6.756 6.756 0 0 0 .9 3.5v-7Z"></path>
        </svg>
      </div>
    );
  } else if (game == "Valorant") {
    return (
      <div className="bg-[#FF4655] p-2 rounded-[5px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-white w-10 h-10"
        >
          <path d="m2.2 4 .1.1c.2.3 11.8 14.8 12.8 16v.1a.1.1 0 0 1-.1.1H8.8a.52.52 0 0 1-.4-.2c-.2-.2-4.4-5.4-6.3-7.9A.31.31 0 0 0 2 12V4.1a.349.349 0 0 1 .2-.1Zm19.8.2c0-.1-.1-.1-.1-.2h-.1l-.2.2c-.9 1.1-8.1 10.1-8.3 10.3l-.1.1c0 .1 0 .1.1.1h6.2c.1 0 .2-.1.3-.2l.2-.2c.5-.7 1.7-2.2 1.8-2.3 0-.1 0-.1.1-.2v-.1c.1-2.4.1-4.9.1-7.5Z"></path>
        </svg>
      </div>
    );
  } else {
    return <div className="bg-zinc-900 p-2 rounded-[5px] w-[40px] h-[40px]"></div>;
  }
};

export default GameLogos;
