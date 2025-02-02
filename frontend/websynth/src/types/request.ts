import { Component } from "./component";

export type Request = {
  prompt: string;
  screenshot: string;
  components: Component[];
};
