import { masonry } from "./masonry";
import { observe } from "./observer";
import { renderDom } from "./renderDom";
import "./style.css";

const margin = 16;

renderDom(margin)

observe();

window.addEventListener("resize", calculateMasonry);

calculateMasonry()

function calculateMasonry() {
  masonry(3, margin, 768)
}

