'use server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

export async function POST(request) {
    const {email,password} = await request.json();
    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('todo-app');
        const users = database.collection('users');
        const existingUser = await users.findOne({email});//Why the {} brackets here I was going with users.findOne(email) is that fine or not and if not why
        if(!existingUser){
            return NextResponse.json({error:'User does not exist want to register?'},{status:401});
        }
        const passwordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!passwordCorrect){
            return NextResponse.json({error:'Incorrect password'},{status:402});
        }
        return NextResponse.json({message: 'Login successful'},{status:200});
    }
    catch(err){
        console.error(err);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
    finally{
        await client.close();
    }
}
