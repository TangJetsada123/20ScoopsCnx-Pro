import express, {Express, NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const config = process.env;

export const authenticationToken= (req, res,next)=>{
  const token = req.body.token || req.query.token || req.headers['access-token'];

  if (!token){
      return res.status(403).send("A token is required for Authen")
  }

  try{
      const decode = jwt.verify(token, config.TOKEN_KEY);
      req.user = decode;
  }catch(error){
      return res.status(401).send("Invalid Token");
  }
  return next();

}