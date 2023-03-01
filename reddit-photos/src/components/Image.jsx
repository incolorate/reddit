function Image({ src }) {
  return (
    <div className="flex items-center justify-center">
      <img src={src} className="rounded shadow" />
    </div>
  );
}
export default Image;
