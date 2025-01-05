export function parseTextToJSX(text: string) {
  const regex = /\*\*(.*?)\*\*/g; // Matches text between ** **
  const parts = text.split(regex); // Splits the text based on the regex

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // Odd indices are the matched groups
      return (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      );
    }
    return part; // Even indices are the plain text
  });
}