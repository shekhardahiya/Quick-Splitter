# Quick-Splitter


When we go on a trip with friends or share expenses as roommates, accurately splitting the bills is required. You can make bill splitting easy with the Quick Splitter.


Features:

Easy sign-in and sign-up functionality.
Create different groups and add members.
Send invites to your friends to split the bill.
Create expenses and add members who were part of them.
Make payments using the mentioned UPI ID.
Mark received payments as settled with just a click.
Check the overall trip cost and expenses.
Comment section for smooth chat with members.
Responsive UI that will work on different screens.


Technologies used:
Angular
Node.js- Express Framework
Bootstrap
MongoDB


Approach Used:

Let’s see how I have completed the application as per the problem statement.

1. I have started by breaking down the application into small user stories. I tried to relate every requirement to real-life scenarios.
2. I then began building the database structure so that I could understand how data would be stored.This helped me relate data across all the API’s. I prepared all the schemas and created a collection in MongoDB.
3. After finalising the DB structure, I started creating API’s as per the user stories. Along with the API’s, I have created demo screens to understand the data flow.
4. After this, I started building the UI screens as per the requirements.
5. Then I started integrating UI screens with their respective API's.
6. After this, I started testing the application with different scenarios and fixed the bugs.


Challenges that I have faced:

Integrating email invite send functionality was bit challenging for me. But now I can do that easily.

Maintaining consistent data and reflecting that in UI was one of the best part that I learned by building this application.

Integrating the Payment gateway like Razorpay was bit confusing for me. I wanted to implement it in a way that two different users can directly settle the amount between them. With Razorpay API, users have to first create a account. I am trying to figure out the possible solutions for this.

I have tried Integrating UPI apps with mobile view, but payment apps were crashing with errors. I am trying to figure out the reasons behind this. 


