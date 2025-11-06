import mongoose from "mongoose";
import { handleRes } from "../helper/handleRes.js";
import contactModel from "../model/contactModel.js";

export const  createContact = async(req,res)=>{
    const {name,email,phoneNumber} = req.body;
    try{

        if(!name || !email || !phoneNumber){
            return handleRes(res,400,{success:false,message:"All feilds are required!!!"})
        };

        if(phoneNumber.length !==10){
            return handleRes(res,400,{success:false,message:"Phone number should be 10 digits!!!"})
        };

         const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         if (!emailRegex.test(email)) {
           return handleRes(res, 400, {
             success: false,
             message: "Invalid email format!",
           });
         }

          if (name.length < 2) {
            return handleRes(res, 400, {
              success: false,
              message: "Name should be at least 2 characters!",
            });
          }

        const isExist = await contactModel.findOne({email});

        if(isExist){
             return handleRes(res,400,{success:false,message:"User already exist!!!"})
        };


        const contact = contactModel({name,email,phoneNumber});
        await contact.save();

        return  handleRes(res,201,{success:true,message:"Contact Created",Data:contact});

    }catch(e){
        return handleRes(res,500,{success:false,message:e.message})
    }
};

export const getAllContacts = async(req,res)=>{
    try{
        const contacts = await contactModel.find();
        if(!contacts || contacts.length === 0){
             return handleRes(res,404,{success:false,message:"Data not found or somthing went wrong"}) 
        };

        return  handleRes(res,200,{success:true,message:"All Contacts",AllData:contacts});

    }catch(e){
         return handleRes(res,500,{success:false,message:e.message})
    }
};

export const deleteContact = async (req,res)=>{
    const {id} = req.query;
    try{
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return handleRes(res,400,{success:false,message:"Id is not correct or not found"})
        };

        const contact = await contactModel.findByIdAndDelete(id);

        if(!contact){
            return handleRes(res,404,{success:false,message:"Something went wrong or contact not found!!!"})
        };

        return handleRes(res,200,{success:true,message:"Contact Delete Succeffully",contact});

    }catch(e){
        return handleRes(res,500,{success:false,message:e.message})
    }
}
export const getSingleContact = async (req,res)=>{
    const {id} = req.query;
    try{
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return handleRes(res,400,{success:false,message:"Id is not correct or not found"})
        };

        const contact = await contactModel.findById(id);

        if(!contact){
            return handleRes(res,404,{success:false,message:"Something went wrong or contact not found!!!"})
        };

        return handleRes(res,200,{success:true,message:"Contact found",contact});

    }catch(e){
        return handleRes(res,500,{success:false,message:e.message})
    }
}