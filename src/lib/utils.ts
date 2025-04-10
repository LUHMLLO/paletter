export function colorToHex(color: string): string {
  if (color.startsWith("rgb")) {
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return "invalid";
    return `#${parseInt(match[1]).toString(16).padStart(2, "0")}${
      parseInt(match[2]).toString(16).padStart(2, "0")
    }${parseInt(match[3]).toString(16).padStart(2, "0")}`;
  } else if (color.startsWith("color(srgb")) {
    color = color.replace("color(srgb ", "").replace(")", "");
    const values = color.split(" ");
    return (
      "#" +
      values
        .map((value) => {
          const n = parseFloat(value);
          const hex = Math.round(n * 255).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }
  return "invalid";
}
