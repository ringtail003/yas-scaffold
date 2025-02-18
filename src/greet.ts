export function greet(name: string): Greeting {
  return { to: name, message: `Hello ${name}!` };
}

export type Greeting = {
  to: string;
  message: string;
};
