import { hillChoice } from "./urlParams.js";

export default function hill() {
  let hill = document.getElementById("grassyhill_id");
  hill?.setAttribute("src", `/static/images/${hillChoice}.png`);
}
