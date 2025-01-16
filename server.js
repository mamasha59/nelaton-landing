import { createServer } from "http";
import next from "next";

const app = next({ dev: false });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(3000, () => {
    console.log("> Ready on http://localhost: 3000");
  });
});