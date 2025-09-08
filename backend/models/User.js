import mongoose from "mongoose";
import slugify from 'slugify'


const userSchema = new mongoose.Schema(
    {
        name: {type: String, require:true,capitalize:true},
        email: {type: String, require:true, unique:true},
        password: {type: String},
        role: {type: String, default:"user"},
        country: {type: String, require:false},
        city: {type: String, require:false},
        address: {type: String, require:false},
        phone: {type: String, require:false},
        slug: {type: String, unique:true,require:false,lowercase:true},
        avatar: {url:{type:String, require:false},public_id:{type:String, require:false}},
        isActive: {
            type:Boolean,
            default:true
        },
        blocked : {
            type: Boolean,
            default: false
        },
        isVerified:{
            type:Boolean,
            default:false
        }
    }
)

userSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      replacement: "_",
      trim: true
    });
  }
  next();
});



export default mongoose.model('User',userSchema)