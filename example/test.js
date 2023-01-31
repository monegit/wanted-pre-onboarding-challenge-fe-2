import { Todo } from "./index.js";

const a = new Todo();

a.items().add("aa");
a.items().add("ff");
a.items().add("aa");
a.items()
  .a.items(1)
  .update({ tags: ["adf", "fasdfdsf"] });
a.items(1).tags().removeAt("adf");
console.log(a.read());
