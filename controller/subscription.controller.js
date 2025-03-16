
// const mongoose = require("moongose");
const Subscription = require("../models/subscriptions");
const { find } = require("../models/user.model");

const findSubscriptionById = async(id)=>{
   if(!mongoose.Types.ObjectId.isValid(id)){
    throw new error(`invalid subscription id ${id}`);
   }
   const  subscription=Subscription.findById(id);
   if(subscription){
    throw new error('subscription not found')
   }
  return subscription; 
}


const getSubscriptionById = async()=>{
    try{
        const sub =  await findSubscriptionById(id);
        res.status(200).json(sub);
    }catch(error){
        console.log("error fetching subscription by id");
        res.status(500).json({
            message:"server error",
            error :error.message
        })
    }
}

const addSubscription = async( req,res)=>{
    const { name, price, frequency, renewalDate } = req.body;
  if (!name || !price || !frequency || !renewalDate) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  try {
    const subscription = new Subscription({
      name,
      price,
      frequency,
      renewalDate,
      user: req.user.id,
      userEmail: req.user.email,
    });
    const savedSubscription = await subscription.save();
    res.status(201).json(savedSubscription);
  } catch (error) {
    console.error('Error adding subscription:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }


}

module.exports={ getSubscriptionById,addSubscription}
