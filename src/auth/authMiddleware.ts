import * as jwt from 'jsonwebtoken';

export function AuthMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('No autorizado');

  try {
    const payload = jwt.verify(token, 'SECRET_KEY');
    req.user = payload; 
    //console.log('.')
    next();
  } catch (err) {
    res.status(401).send('Token invalido');
  }
}
