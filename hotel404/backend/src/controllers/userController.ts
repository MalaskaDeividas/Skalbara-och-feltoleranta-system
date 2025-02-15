import mongoose from "mongoose";
import { User } from "../Model/User";
import { error } from "console";
import { Booking } from "../Model/Booking";
import logger from  "../logger";


//function som hanterar login
export async function AuthLogin (username: string, password:string)
{
    try {
        const found = await User.findOne({username:username, password:password})
        if (!found)
        {
            //If there is no sush a username
            logger.error('No user found');
            throw new Error('User not found');
        }
        //Om den hittar ett doc där username och password stämmer så fås _id
        console.log(found._id)
        return found._id;
    }
    catch (error)
    {
        if(error instanceof Error) {
            logger.error('Login not found');
        }
        else 
        {
            logger.error('Login not found');
        }
        throw error;
    }

}

//Funktion som kolla ifall det finns en annan användare med samma username
//Om det inte finns en match return true annars false
async function usernameCheck(username: string)
{
    try {
        const check = await User.findOne({username:username})
        logger.info('Finding username..');
        if(check)
        {
            //En match hittades
            logger.info('Found username!');
            return false;
        }
        //En match hittades inte
        logger.info('Did not find username!');
        return true;
    }
    catch (error)
    {   
        logger.error('Error in fetching username');
        console.error(error)
    }
}
//En funktion för att kolla ålder
//Om åldern är ok returnar den true 
function checkAge (age:number) 
{   
    logger.info('Checking age..');
    return age >=18;
}

//Function för att hantera en ny användare
export async function newUser(name:string, lastname:string, username:string, age: number, password: string, isAdmin: boolean) {
    
        const firstCheck = await usernameCheck(username);
        const secondCheck = checkAge(age);
        if(!firstCheck)
        {   
            logger.info('Username is taken!');
            throw new Error('This username is taken');
        }
        else if(!secondCheck)
        {   
            logger.info('Age too low to make account!');
            throw new Error('You are too young to make an account');
        }
        User.create({
            name: name,
            lastname: lastname,
            username:username,
            password:password,
            isAdmin: isAdmin,
            age: age

        })

        logger.info('User succesfully created!');
    
    

}

// Function to delete a user
export async function deleteUser(username:string) {
    try 
    {
        // Find the user, delete the users bookings and then delete the user
        const user  = await User.findOne({username: username});
        await Booking.deleteMany({user: username});
        await User.deleteOne({username: username });
    }
    catch (error)
    {
        if (error instanceof Error) 
        {
            logger.error('Error deleting user by ID');
        } 
        else 
        {
            logger.error('An unexpected error occurred:');
        }

        throw error;
    }

}



