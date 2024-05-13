const User = require("../models/productSchema")

exports.create = async(req,res) =>{
    try{
        const { name, price } = req.body;
        const imageURL = req.file.path;
        
        const newUser = new User({name,imageURL,price});
        await newUser.save();
        res.status(201).json({message:"Data Added",user:newUser});
    }
    catch(error){
      console.log(error);
      res.status(500).send(error);
    }
}

exports.getAll = async(req,res) =>{
    try {
        const data = await User.find({});
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.edit = async (req,res)=>{
    try {
        const id = req.params.id;
        const {name,imageURL,price} = req.body;

        const updateUser = await User.findByIdAndUpdate(id,{name,imageURL,price},{new:true});
        if(!updateUser){
            return res.status(404).json({message:"User not Found"});
        }
        return res.status(200).json({message:"User updated",user:updateUser});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to update the data",error});
    }
}

exports.delete = async(req,res)=>{
        try {
            const id = req.params.id;
           
            const deleteUser = await User.findByIdAndDelete(id);

             if(!deleteUser){
                return res.status(404).json({message:"User not found"})
            }
            return res.status(200).json({message:"User is Deleted",user:deleteUser});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Faield to delete the data",error})
        }
}
