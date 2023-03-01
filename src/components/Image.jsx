function Image({ src, handleClick }) {
  return (
    <div className="flex items-center justify-center">
      <img src={src} className="rounded shadow" onClick={handleClick} />
    </div>
  );
}
export default Image;
