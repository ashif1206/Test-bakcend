export  function handleRes(res,statusCode,message){
    return res.status(statusCode).json(message)
}