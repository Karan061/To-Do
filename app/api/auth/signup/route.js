'use server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

export async function POST(request) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const {email,password} = await request.json();
    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    try {
        await client.connect();
        const database = client.db('todo-app');
        const users = database.collection('users');
        const existingUser = await users.findOne({email});
        if(existingUser){
            return NextResponse.json({error:'User already exists'},{status:401})
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = {
                email: email,
                password: hashedPassword,
                createdAt: new Date()
            }
            const result = await users.insertOne(newUser);
            const createdUser = {...newUser, _id: result.insertedId };
            delete createdUser.password;
            return NextResponse.json(createdUser, {status:201});
        }
    }
    catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
    finally{
        await client.close();
    }
}
