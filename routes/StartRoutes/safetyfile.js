const verifyUserLogin = async (email,password)=>{
    try {
      
        const user = await Talent.findOne({email});
        console.log("valid--email--"+user._id);
        console.log("valid--passw--"+user.email);
        if(!user){
            return {status:'error',error:'users not found'}
        }
        if(await bcrypt.compare(password,user.password)){
            // creating a JWT token
            const data = {id:user._id,username:user.email};
            const token = jwt.sign({user},jwttoken,(err,token) =>{
              // console.log("token---"+token);
              // res.json({token});
              return {status:'ok',data:token}
            });
           // return {status:'ok',data:token}
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
  }
  


  //working down

  const createTokenLogin = async (email,password,_id)=>{
    try {
      
        const user = await Talent.findOne({email});
        // console.log("valid--email--"+user._id);
        // console.log("valid--passw--"+user.email);
        if(!user){
            return {status:'error',error:'users not found'}
        }
        if( bcrypt.compare(password,user.password)){
            // creating a JWT token
            const token = jwt.sign({id:user._id},JWT_SECRET)
            console.log("token---"+token);
              return {status:'ok',data:token}
            
        }else{
        console.log('invalid ----- password');
        return {status:'error',error:'invalid password'};
        }
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
  }
  



  const {token}=req.cookies;
    if(verifyToken(token)){
        return res.render('home');
    }else{
        res.redirect('/login')
    }


     //const checkUserExist = await Business.findOne({ email }).countDocuments();
        //  console.log("wfwfwfwfwff"+checkUserExist);
        // if (!checkUserExist == 1){
             //  }else{
        //     console.log("inside else");
        //     res.status(401).json({message: "Business already exist with this Email"});
        // }