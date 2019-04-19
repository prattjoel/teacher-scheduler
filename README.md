### Back End
I ended up focusing mostly on the database implementation.  A schedule can be created by adding a teacher to the database and then adding classes to that teachers schedule.  Teachers and classes are stored in separate collections with teachers having a 1 to many reference to classes. 

When a class is created it is automatically assigned to the current teacher.  A class can then be updated while maintaining its reference to the appropriate teacher.  Classes can also be deleted.  Upon deletion, a class is removed from the class collection and the teachers reference to it is also removed.

At any point, a teacher's schedule can be retrieved by getting all of the classes referenced by that teacher.

To account for the different types of schedules (weekly, bi-weekly, 7 day etc.), I assigned each class a day value that would indicate where it fell in the schedule.  For example, each class in a bi-weekly schedule would have a day inputValue between 1-10 and each class in a 7 day schedule would have a day value between 1-7.  That way each class would have a clear place on calendar even once the schedule begins repeating.

### Front End
This was my secondary priority so I ended up running out of time before implementing everything I would have liked to implement. 

I enabled the ability to create teachers and classes and retrieve all classes for a teacher in the Front end but without any style UI to support it.

If I had more time, I would have liked to create UI to support all of the database functionality and display schedules based on the different rotations (weekly, bi-weekly etc.).
 
### Stack

I used Mongoose with MongoDB for the database, Express/Node.js for the server and React for the front end.  Most of the choices around the stack were to facilitate quick, simple implementations.

### Building
- Start the server: `npm run server`
- Run the app React: `npm start`
- It could be helpful to use something like [Postman](https://www.getpostman.com/) to test some of the additional database functionality not supported in the front end (like deleting and updating classes).


