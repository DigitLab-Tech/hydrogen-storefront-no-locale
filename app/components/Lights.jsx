export default function Lights({
  colors = [0, 0, 0, 0, 0, 0, 0, 0, 0],
  isThumbnail = false,
  onColorChange = () => {},
}) {
  return (
    <div
      className={`grid grid-cols-3 w-fit ${isThumbnail ? 'gap-1' : 'gap-3'}`}
    >
      {colors.map((color, i) => (
        <Light
          key={i}
          index={i}
          color={color}
          isThumbnail={isThumbnail}
          onColorChange={onColorChange}
        />
      ))}
    </div>
  );
}

function Light({
  index = 0,
  color = 0,
  isThumbnail = false,
  onColorChange = () => {},
}) {
  const bgColors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500'];

  return (
    <button
      onClick={() => {
        onColorChange(index);
      }}
      className={`rounded-[80px] ${
        isThumbnail ? 'w-[20px] h-[20px]' : 'w-[100px] h-[100px]'
      } ${bgColors[color]}`}
    ></button>
  );
}
