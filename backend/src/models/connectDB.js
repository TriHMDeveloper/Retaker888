import mongoose from 'mongoose';

await mongoose.connect('mongodb://localhost/DatabaseDemo');

const Schema = mongoose.Schema;

const Student = new Schema({
//   _id: Schema.ObjectId,
  name: String,
  age: String,
  salary: Number,
  description: String,
  list_course: {
    course: {
      type : String,
      ref : "course"
    }
  }
  // course: {
  //   type : String,
  //   ref : "course"
  // }
  
}
, {
    collection: 'Student'
}
);

const Person = new Schema({
    name: String,
    age: String,
    contact: {
      phone: String,
      email: String
    },
  }, {
      collection: 'Person'
});

const Course = new Schema({
    name: String,
    // teacher: String
    teacher : {
      type : String,
      ref : 'person'
    }
}, {
      collection: 'Course'
});

const StudentModel = mongoose.model('Student', Student);
const PersonModel = mongoose.model('person', Person);
const CourseModel = mongoose.model('course', Course);

//select, luôn trả về mảng dù rỗng
StudentModel.find({
    // name: "xaki"
    // name: /i/
    // salary : { $gte : 1000}
    // $or : [
    //   { name: /v/ },
    //   { salary : { $lte : 1000} },
    // ]

    // salary : { $in : [900,1000,2000] }
    name: "Quan"
})
// .skip(1)
// .limit(2)
// .sort('age')
// .populate('course')
// .populate({
//   path : 'course',
//   populate: {
//     path: 'teacher'
//   }
// })
.populate('list_course.course')
.then(data => console.log('data:', data))
.catch(err => console.log('error:', err))



// create
// StudentModel.create({
//     name: "khoa",
//     age: "10",
//     description: "auto xuống lớp",
//     address: "DN"
// })
// .then(data => console.log('data:', data))
// .catch(err => console.log('error:', err))


// updateOne, updateMany

// StudentModel.updateMany({
//     name: "trí",
//     age: "11",
    
// },{
//     description: "len lop auto"
// })
// .then(data => console.log('data:', data))
// .catch(err => console.log('error:', err))


// deleteOne, deleteMany
// StudentModel.deleteOne({
//     name: "trí",
//     age: "11",
    
// })
// .then(data => console.log('data:', data))
// .catch(err => console.log('error:', err))



