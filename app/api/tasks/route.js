import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';


export async function GET(request) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('todo-app');
    const tasks = database.collection('tasks');

    const allTasks = await tasks.find({}).toArray();
    return NextResponse.json({ tasks: allTasks });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const { text } = await request.json();
  if (!text) {
    return NextResponse.json({ error: 'Task text is required' }, { status: 400 });
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('todo-app');
    const tasks = database.collection('tasks');
    const newTask = {
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    const result = await tasks.insertOne(newTask);
    const createdTask = { ...newTask, _id: result.insertedId };
    return NextResponse.json(createdTask, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  } finally {
    await client.close();
  }
}