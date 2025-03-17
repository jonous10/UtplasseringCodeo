type SquareVar = {
    value: string;
    onSquareClick: () => void;
    squareColor: string;
}

export function Square({ value, onSquareClick, squareColor }: SquareVar) {
    let squareTextColor = value ? 
    value == "X" ? "text-green-700" : "text-blue-700" :
    {color: "text-gray-100"};
    
    return (
      <button
        className={`w-48 h-48 border-4 rounded-2xl m-4 text-8xl ${squareColor} ${squareTextColor} cursor-pointer transition`}
        id={value}
        onClick={onSquareClick}
      >
        {value}
      </button>
    );
}
