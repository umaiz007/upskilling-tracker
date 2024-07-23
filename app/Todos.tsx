import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Button, Heading } from "@aws-amplify/ui-react";
import styles from "./page.module.css";
import { FormEvent, useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState<Schema["Todo"][]>();
  const [todo, setTodo] = useState("");
  const client = generateClient<Schema>();

  useEffect(() => {
    const getAll = async () => getTodos();
    getAll();
  }, []);

  async function getTodos() {
    const { data: todos } = await client.models.Todo.list();
    setTodos(todos);
  }

  async function addTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("todo", todo);
    if (!todo) return;
    const { data } = await client.models.Todo.create(
      {
        content: todo,
      },
      { authMode: "userPool" }
    );

    setTodo("");
    getTodos();
  }
  return (
    <div className={styles.main}>
      <Heading level={1}>List and display todos</Heading>
      <form className={styles.main} onSubmit={(e) => addTodo(e)}>
        <input
          placeholder="Add todo"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button variation="primary" type="submit">
          Add Todo
        </Button>
      </form>
      {todos?.map((todo) => (
        <>
          <div>content: {todo.content}</div>
          <div>content: {todo.id}</div>
        </>
      ))}
    </div>
  );
}
