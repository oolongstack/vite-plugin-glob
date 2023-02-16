import "./style.css";
import typescriptLogo from "./typescript.svg";
import { setupCounter } from "./counter";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;
// const result = import.meta.glob("./globs/*.ts");
interface ModuleType {
  name: string;
}
const result = import.meta.globNext<ModuleType>("./globs/*.ts");
console.log("result: ", result);

// console.log(result);
Promise.all(Object.values(result).map((it) => it())).then((modules) => {
  console.log("modules: ", modules);
  document.querySelector<HTMLDivElement>("#app")!.innerHTML =
    JSON.stringify(modules);
});

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
