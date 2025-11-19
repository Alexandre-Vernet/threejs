export const keyboard = () => {
  const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    flyUp: false,
    flyDown: false,
    sprint: false
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "z") keys.forward = true;
    if (e.key === "s") keys.backward = true;
    if (e.key === "q") keys.left = true;
    if (e.key === "d") keys.right = true;
    if (e.key === " ") keys.flyUp = true;
    if (e.key === "Control") keys.flyDown = true;
    if (e.key === "Shift") keys.sprint = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "z") keys.forward = false;
    if (e.key === "s") keys.backward = false;
    if (e.key === "q") keys.left = false;
    if (e.key === "d") keys.right = false;
    if (e.key === " ") keys.flyUp = false;
    if (e.key === "Control") keys.flyDown = false;
    if (e.key === "Shift") keys.sprint = false;
  });

  return keys;

}
