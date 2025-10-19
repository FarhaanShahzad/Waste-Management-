 var jwt = require('jsonwebtoken');




  const authMiddleware = (role) => {
    return (req , res , next) =>{
             //check the token if token is valid  allow next
                     let token = req.headers?.authorization?.split(" ")[2];

                     if(token)
                     {
                        var decoded = jwt.verify(token, 'shhhhh');

                        if(decoded){
                            if(role.includes(decoded.role))
                            {
                               req.user = decoded.userId;
                               next();
                               console.log("pass through auth middleware ")
                            }else{
                               res.status(401).json({ msg: "unauthorized ......" });
                            }
                        }else{
                            res.status(401).json({ msg: "try login again" });
                        }
                     } else{
                        res.status(401).json({ msg: "not  through auth middleware" });
                     }
            }


  }








//  const authMiddleware =  (req , res , next) =>{
//             //check the token if token is valid  allow next
//                     let token = req.headers?.authorization?.split(" ")[2];
//
//                     if(token)
//                     {
//                        var decoded = jwt.verify(token, 'shhhhh');
//
//                        console.log(decoded)
//
//                        if(decoded){
//
//                               req.user = decoded.userId;
//                               next();
//                               console.log("pass through auth middleware ")
//
//                        }else{
//                            res.status(401).json({ msg: "try login again" });
//                        }
//                     } else{
//                        res.status(401).json({ msg: "not  through auth middleware" });
//                     }
// }
//

 module.exports = authMiddleware;

